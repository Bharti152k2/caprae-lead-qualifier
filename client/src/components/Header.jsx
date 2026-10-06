function Header() {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                        C
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                            Caprae Lead Qualifier
                        </h1>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Acquisition target screening dashboard
                        </p>
                    </div>
                </div>

                <div className="hidden items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 sm:flex">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Acquisition Screening
                </div>
            </div>
        </header>

    );
}

export default Header;
