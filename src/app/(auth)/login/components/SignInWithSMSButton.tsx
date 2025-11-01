"use client";
import { useState, useRef } from "react";
import { supabase } from "@/app/db";
import { Button } from "@/components/ui/button";

export default function SignInWithSMSButton() {
  const [digits, setDigits] = useState(""); // only 8 digits after +357
  const [displayName, setDisplayName] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingUser, setExistingUser] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const phone = `+357${digits}`;

  async function sendOtp() {
    if (digits.length !== 8) {
      alert("Please enter a valid 8-digit phone number");
      return;
    }

    if (!existingUser && !displayName) {
      alert("Please enter a display name");
      return;
    }

    setLoading(true);

    const full_name = displayName;
    const { error } = existingUser
      ? await supabase.auth.signInWithOtp({
          phone,
          options: { shouldCreateUser: false },
        })
      : await supabase.auth.signInWithOtp({
          phone,
          options: {
            shouldCreateUser: true,
            data: { full_name },
          },
        });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setOtpSent(true);
    }
  }

  async function verifyOtp() {
    const code = otpDigits.join("");
    if (code.length !== 6) {
      alert("Please enter the 6-digit OTP code");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else if (data?.session) {
      window.location.href = "/";
    }
  }

  function handleDigitChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    if (value.length <= 8) setDigits(value);
  }

  // OTP logic
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // only allow 0-9 single digit
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (paste.length === 6) {
      const newOtp = paste.split("").slice(0, 6);
      setOtpDigits(newOtp);
      newOtp.forEach((d, i) => {
        if (inputsRef.current[i]) inputsRef.current[i]!.value = d;
      });
      inputsRef.current[5]?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-3">
        <hr/>
      {!otpSent ? (
        <>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={existingUser}
              onChange={() => setExistingUser((v) => !v)}
            />
            I already have a phone number account
          </label>

          {!existingUser && (
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              required
              onChange={(e) => setDisplayName(e.target.value)}
              className="border p-2 rounded"
            />
          )}

          <div className="flex border rounded overflow-hidden">
            <span className="px-2 bg-gray-100 flex items-center select-none">
              +357
            </span>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="########"
              value={digits}
              required
              onChange={handleDigitChange}
              className="flex-1 p-2 outline-none"
            />
          </div>

          <Button onClick={sendOtp} disabled={loading}>
            {loading
              ? "Sending..."
              : existingUser
              ? "Send OTP (Login)"
              : "Send OTP (Sign Up)"}
          </Button>
        </>
      ) : (
        <>
          <div className="flex justify-center gap-2 mt-3 mb-1">
            {otpDigits.map((digit, i) => (
            <input
                key={i}
                ref={(el) => {
                inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-10 h-12 text-center text-lg border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
                onPaste={handleOtpPaste}
            />
            ))}
          </div>

          <Button onClick={verifyOtp} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </>
      )}
    </div>
  );
}
