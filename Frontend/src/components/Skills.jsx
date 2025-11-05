import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaNodeJs, FaReact, FaDatabase, FaGitAlt, FaDocker, FaAngular, FaJava } from 'react-icons/fa'
import { SiExpress, SiPostgresql, SiJavascript, SiTypescript, SiPhp, SiMysql } from 'react-icons/si'
import { Code2, Server, Database, Wrench, Sparkles, TrendingUp, Award } from 'lucide-react'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "",
      borderColor: "border-cyan-500",
      description: "Interfaces modernas y responsivas",
      skills: [
        { name: "React", icon: FaReact, color: "text-cyan-500", level: 100, years: "3+" },
        { name: "Angular", icon: FaAngular, color: "text-[#DD0031]", level: 100, years: "2+" },
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500", level: 100, years: "4+" },
        { name: "TypeScript", icon: SiTypescript, color: "text-blue-600", level: 100, years: "2+" },
      ]
    },
    {
      title: "Backend",
      icon: Server,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "",
      borderColor: "border-cyan-500",
      description: "APIs robustas y escalables",
      skills: [
        { name: "PHP", icon: SiPhp, color: "text-[#777BB4]", level: 100, years: "4+" },
        { name: "Node.js", icon: FaNodeJs, color: "text-green-600", level: 100, years: "3+" },
        { name: "Express", icon: SiExpress, color: "text-gray-700", level: 100, years: "3+" },
        { name: "Java", icon: FaJava, color: "text-[#007396]", level: 100, years: "2+" },
      ]
    },
    {
      title: "Bases de Datos",
      icon: Database,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "",
      borderColor: "border-cyan-500",
      description: "Diseño y optimización de datos",
      skills: [
        { name: "SQL Server", icon: FaDatabase, color: "text-red-600", level: 100, years: "4+" },
        { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]", level: 100, years: "4+" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-700", level: 100, years: "3+" },
      ]
    },
    {
      title: "Herramientas",
      icon: Wrench,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "",
      borderColor: "border-cyan-500",
      description: "DevOps y control de versiones",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "text-orange-600", level: 100, years: "4+" },
        { name: "Docker", icon: FaDocker, color: "text-blue-500", level: 100, years: "2+" },
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white to-gray-50">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header con animación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Stack Tecnológico
            </span>
          </motion.div>

          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Skills Técnicas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tecnologías y herramientas con las que construyo soluciones empresariales
          </p>
        </motion.div>

        {/* Stats rápidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
        >
        </motion.div>

        {/* Grid de categorías de skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setActiveCategory(index)}
              onHoverEnd={() => setActiveCategory(null)}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${category.bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${category.borderColor} h-full`}>
                {/* Header de categoría */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    {activeCategory === index && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="text-green-500"
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {category.description}
                  </p>
                </div>

                {/* Lista de skills */}
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      onHoverStart={() => setHoveredSkill(`${index}-${i}`)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="relative"
                    >
                      {/* Skill header */}
                      <div className="flex items-center gap-3 mb-2 group/skill">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <skill.icon className={`text-2xl ${skill.color} transition-all duration-300`} />
                          {hoveredSkill === `${index}-${i}` && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 bg-white/30 rounded-full blur-sm"
                            />
                          )}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-800 text-sm">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Barra de progreso */}
                      <div className="relative h-2 bg-gray-200/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                        {hoveredSkill === `${index}-${i}` && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute -top-8 right-0 bg-gray-800 text-white px-2 py-1 rounded text-xs font-semibold"
                          >
                            {skill.level}%
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Efecto de brillo en la card */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700 pointer-events-none rounded-2xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default Skills