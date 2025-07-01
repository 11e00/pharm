import Link from 'next/link';

export default function Navbar(){
    return(
        <nav>
            <Link href="/">Home</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Cart</Link>
        </nav>
    );
}
