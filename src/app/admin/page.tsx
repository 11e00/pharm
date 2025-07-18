import QRScanner,{selectMode} from './clientFunctions';

export default function ScanPage() {

    
  return (
    <div>
        <selectMode/>
        <QRScanner/>
    </div>
  );
}
