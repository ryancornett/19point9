export default function Footer() {
    const year = new Date().getFullYear();
    const yearRange = year == 2025 ? year : `2025-${year}`;
    return (
        <footer>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-6">Made by <a href="https://ryancornett.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-800 dark:hover:text-slate-300">Ryan Cornett</a> | All rights reserved {yearRange}</p>
        </footer>
    )
}