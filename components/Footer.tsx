import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="py-12 bg-night border-t border-white/5 text-center">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-6">
                    <Logo className="w-8 h-8 text-lavender" />
                    <h3 className="text-3xl font-display text-transparent bg-clip-text bg-gradient-to-r from-lavender to-purple">
                        CampusPulse
                    </h3>
                </div>

                <div className="flex justify-center gap-8 mb-8 text-white/50 font-inter text-sm">
                    <a href="#" className="hover:text-lavender transition-colors">Instagram</a>
                    <a href="#" className="hover:text-lavender transition-colors">Twitter</a>
                    <a href="#" className="hover:text-lavender transition-colors">TikTok</a>
                    <a href="#" className="hover:text-lavender transition-colors">Contact</a>
                </div>

                <p className="text-white/30 text-xs font-inter">
                    &copy; {new Date().getFullYear()} CampusPulse. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
