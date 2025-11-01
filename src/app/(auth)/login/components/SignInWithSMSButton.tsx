"use client";
import { useState, useRef } from "react";
import { supabase } from "@/app/db";
import { Button } from "@/components/ui/button";

export default function SignInWithSMSButton() {
  const [step, setStep] = useState<"start" | "choose" | "form" | "otp">("start");
  const [existingUser, setExistingUser] = useState<boolean | null>(null);

  const [digits, setDigits] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const phone = `+357${digits}`;

  // --- Send OTP ---
  async function sendOtp() {
    if (digits.length !== 8) {
      alert("Please enter a valid 8-digit phone number");
      return;
    }
    if (existingUser === false && !displayName) {
      alert("Please enter a display name");
      return;
    }

    setLoading(true);

    const { error } = existingUser
      ? await supabase.auth.signInWithOtp({
          phone,
          options: { shouldCreateUser: false },
        })
      : await supabase.auth.signInWithOtp({
          phone,
          options: { shouldCreateUser: true, data: { full_name: displayName } },
        });

    setLoading(false);

    if (error) alert(error.message);
    else setStep("otp");
  }

  // --- Verify OTP ---
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

    if (error) alert(error.message);
    else if (data?.session) window.location.href = "/";
  }

  // --- Handlers ---
  const handleDigitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) setDigits(value);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
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

  // --- UI ---
  return (
    <div className="flex flex-col gap-3">
      {step === "start" && (
        <Button variant="outline" onClick={() => setStep("choose")}>Login with Phone Number</Button>
      )}

      {step === "choose" && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-700">
            Do you already have a phone number account?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setExistingUser(true);
                setStep("form");
              }}
            >
              Yes, I already have one
            </Button>
            <Button
              onClick={() => {
                setExistingUser(false);
                setStep("form");
              }}
            >
              No, I’m new here
            </Button>
          </div>
        </div>
      )}

      {step === "form" && (
        <>
          {!existingUser && (
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="border p-2 rounded"
              required
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
              onChange={handleDigitChange}
              required
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

          <Button
            variant="ghost"
            onClick={() => setStep("choose")}
            className="text-sm text-gray-500"
          >
            ← Go Back
          </Button>
        </>
      )}

      {step === "otp" && (
        <>
          <div className="flex justify-center gap-2 mt-3 mb-1">
            {otpDigits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {inputsRef.current[i] = el;}}
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

          <Button
            variant="ghost"
            onClick={() => setStep("form")}
            className="text-sm text-gray-500"
          >
            ← Go Back
          </Button>
        </>
      )}
    </div>
  );
}
