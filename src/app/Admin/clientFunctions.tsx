// QRScanner.tsx
'use client'
import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { InsertProduct } from '../db';



export default function QRScanner() {
    const [manual, setManual] = useState(true);
    const [manualBarcode, setManualBarcode] = useState<string>('');
    const [codes, setCodes] = useState<string[]>([]);
    return (

    <div>
        <div className="flex mt-2 justify-self-center gap-2">
            <label className="text-slate-600 text-sm cursor-pointer">Manual</label>
            
            <form className="relative inline-block w-11 h-5">
                <input onClick={()=>setManual((m)=>!m)} id="switch-component-on" type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-800 rounded-full cursor-pointer transition-colors duration-300" />
                <label className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
                </label>
            </form>
            
            <label className="text-slate-600 text-sm cursor-pointer">Scanner</label>
        </div>
        
        <div className={manual?'justify-self-center max-w-400 m-auto pt-20':'hidden'}>
            <form onSubmit={e => { e.preventDefault(); InsertProduct(manualBarcode);}} className='inline-block  max-w-auto'>
                <input type="text" name="search" placeholder="Barcode" value={manualBarcode} onChange={(e) => setManualBarcode(e.target.value)} className="max-h-7 self-center block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                <button onClick={() => InsertProduct(manualBarcode)} style={{margin:"10px"}} type="button" className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white" id="search-button" aria-expanded="false" aria-haspopup="true">Create New Product</button>
            </form>   
        </div>

        <div className={manual?'hidden':'max-w-400 m-auto pt-20'}>
            <Scanner
            onScan={(detected) => {
                const values = detected.map(scanned => scanned.rawValue);
                setCodes(values);
            }}
            onError={(err) => {
                console.error('Scanner error', err);
            }}
            constraints={{ facingMode: 'environment' }}
            scanDelay={500}
            allowMultiple={true}
            formats={[
                'aztec' ,
                'code_128' ,
                'code_39' ,
                'code_93' ,
                'codabar' ,
                'databar' ,
                'databar_expanded' ,
                'data_matrix' ,
                'dx_film_edge' ,
                'ean_13' ,
                'ean_8' ,
                'itf' ,
                'maxi_code' ,
                'micro_qr_code' ,
                'pdf417' ,
                'qr_code' ,
                'rm_qr_code' ,
                'upc_a' ,
                'upc_e' ,
                'linear_codes' ,
                'matrix_codes' ,
                'unknown'
            ]}
            />
            <p>{codes}</p>
        </div>
    </div>
    );
}
