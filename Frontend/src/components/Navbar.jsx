// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleResize = () => {
      // Cierra el menú si se pasa a desktop
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        isScrolled ? 'backdrop-blur bg-white/70 dark:bg-neutral-900/70 shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-bold tracking-wide text-lg">
            JRV
          </a>

          {/* Links (desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#sobre-mi" className="hover:opacity-80 transition">Sobre mí</a>
            <a href="#proyectos" className="hover:opacity-80 transition">Proyectos</a>
            <a href="#skills" className="hover:opacity-80 transition">Skills</a>
            <a href="#stats" className="hover:opacity-80 transition">Estadísticas</a>
          </div>

          {/* Acciones derecha */}
          <div className="flex items-center gap-4">
            {/* Redes (desktop) */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://github.com/Ricardo010203"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:opacity-80 transition"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/JhojanVelasco"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:opacity-80 transition"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>

            {/* Botón menú (mobile) */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label="Abrir menú"
            >
              <svg
                className={`h-6 w-6 ${open ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${open ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 sm:px-6">
          <div className="flex flex-col gap-3">
            <a onClick={() => setOpen(false)} href="#sobre-mi" className="py-2">Sobre mí</a>
            <a onClick={() => setOpen(false)} href="#proyectos" className="py-2">Proyectos</a>
            <a onClick={() => setOpen(false)} href="#skills" className="py-2">Skills</a>
            <a onClick={() => setOpen(false)} href="#estadisticas" className="py-2">Estadísticas</a>
          </div>

          {/* Redes (mobile) */}
          <div className="mt-4 flex items-center gap-4">
            <a
              href="https://github.com/Ricardo010203"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-md hover:opacity-80 transition"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/JhojanVelasco"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-md hover:opacity-80 transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
