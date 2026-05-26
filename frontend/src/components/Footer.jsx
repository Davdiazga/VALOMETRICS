function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center font-poppins font-bold text-white text-xs">
              V
            </div>
            <span className="font-poppins font-bold text-sm text-white">
              Valo<span className="text-primary">Metrics</span>
            </span>
          </div>
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} ValoMetrics &mdash; Proyecto universitario
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
