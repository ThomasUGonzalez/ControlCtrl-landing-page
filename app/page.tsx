"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Monitor, Wifi, Building2, HardDrive, MessageCircle, MapPin, Phone, Mail,
  ChevronRight, Shield, Clock, Award, Menu, X, ChevronDown, Cpu, Wrench, Network,
} from "lucide-react";
import { useRef, useState } from "react";

const CONFIG = {
  nombreNegocio: "ControlSI",
  ciudad: "Venado Tuerto",
  provincia: "Santa Fe",
  telefono: "3462416945", 
  telefonoFormateado: "+54 9 3462 41-6945", 
  email: "ThomasGonzalez@gmail.com",
  direccion: "Brown 1275",
  horario: "Lunes a Viernes de 09:00 a 18:00 hs",
  añosExperiencia: "+15",
  añoActual: 2026,
};

const MAP_QUERY = encodeURIComponent(`${CONFIG.direccion}, ${CONFIG.ciudad}, ${CONFIG.provincia}, Argentina`);
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const RESEÑA_EN_VIVO = {
  mostrar: false, // <-- En la reunión vas a cambiar esto a true
  name: "Thomas Gonzalez", // <-- Acá ponés el nombre del dueño
  role: "Dueño de ControlSI",
  text: "La verdadera página papaaaaaa",
};
const WHATSAPP_URL = `https://wa.me/549${CONFIG.telefono}?text=Hola%20${CONFIG.nombreNegocio}%2C%20te%20contacto%20desde%20la%20web.%20Necesito%20asistencia%20t%C3%A9cnica%20en%20${CONFIG.ciudad}.`;


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animated Section Component
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Service Modal Component
function ServiceModal({
  isOpen,
  onClose,
  service,
}: {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: React.ElementType;
    title: string;
    description: string;
    details: string[];
  } | null;
}) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="rounded-2xl border border-slate-700 bg-[#1e293b] p-6 shadow-2xl md:p-8">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600">
                    <service.icon className="h-7 w-7 text-[#0f172a]" />
                  </div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    {service.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mb-6 text-slate-400">{service.description}</p>
              <ul className="mb-8 space-y-3">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                    <span className="text-slate-300">{detail}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 font-semibold text-[#0f172a] transition-all hover:from-orange-500 hover:to-orange-600"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar este servicio
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/10 bg-[#0f172a]/70 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600">
                <Monitor className="h-5 w-5 text-[#0f172a]" />
              </div>
              <span className="text-lg font-bold text-white">
                Control<span className="text-cyan-400">SI</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#servicios"
                className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
              >
                Servicios
              </a>
              <a
                href="#ubicacion"
                className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
              >
                Ubicacion
              </a>
              <a
                href="#faq"
                className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
              >
                FAQ
              </a>
              <a
                href="#contacto"
                className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
              >
                Contacto
              </a>
            </div>

            {/* CTA Button */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition-all hover:from-orange-500 hover:to-orange-600 hover:shadow-lg hover:shadow-orange-500/25 md:block"
            >
              Soporte Urgente
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white md:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 md:hidden"
              >
                <a
                  href="#servicios"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  Servicios
                </a>
                <a
                  href="#ubicacion"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  Ubicacion
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  FAQ
                </a>
                <a
                  href="#contacto"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  Contacto
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 py-2.5 text-center text-sm font-semibold text-[#0f172a] transition-all hover:from-orange-500 hover:to-orange-600"
                >
                  Soporte Urgente
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-32">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-slate-400 md:text-xl"
>
  Reparación de PC, notebooks, redes empresariales y soluciones informáticas.{" "}
  <span className="block mt-2 font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg inline-block text-sm md:text-base animate-pulse">
     ¿Tu equipo no enciende o está lento? Diagnóstico rápido en Venado Tuerto.
  </span>
  
</motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Tu tecnologia en las
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            {" "}
            mejores manos
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-slate-400 md:text-xl"
        >
          Reparacion de PC, notebooks, redes empresariales y soluciones
          informaticas. {CONFIG.añosExperiencia} años de experiencia brindando servicio de calidad en {CONFIG.ciudad} y la region.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-4 text-lg font-semibold text-[#0f172a] shadow-lg shadow-cyan-500/25 transition-all hover:from-orange-500 hover:to-orange-600 hover:shadow-orange-500/25"
          >
            <MessageCircle className="h-5 w-5" />
            Contactanos Ahora
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="#servicios"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border border-slate-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-cyan-500 hover:bg-cyan-500/10"
          >
            Ver Servicios
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            { value: CONFIG.añosExperiencia, label: "Años de experiencia" }, // Vinculado a la constante
            { value: "+5000", label: "Equipos reparados" },
            { value: "+100", label: "Empresas confian" },
            { value: "24hs", label: "Soporte urgente" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-cyan-400 md:text-4xl">
              {stat.value}
              </div>
            <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
  </div>
))}
        </motion.div>
      </div>
    </section>
  );
}

// Brand Logos Section
const brands = [
  { name: "Intel", logo: "INTEL" },
  { name: "AMD", logo: "AMD" },
  { name: "Microsoft", logo: "MICROSOFT" },
  { name: "HP", logo: "HP" },
  { name: "Dell", logo: "DELL" },
  { name: "Lenovo", logo: "LENOVO" },
  { name: "ASUS", logo: "ASUS" },
];

function BrandLogos() {
  return (
    <section className="border-y border-slate-800 bg-[#0f172a]/50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-8 text-center text-sm text-slate-500">
          Trabajamos con las mejores marcas
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="group cursor-pointer"
            >
              <span className="text-xl font-bold tracking-wider text-slate-600 opacity-50 transition-all duration-300 group-hover:text-cyan-400 group-hover:opacity-100 md:text-2xl">
                {brand.logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
const services = [
  {
    icon: Cpu,
    title: "Soporte de Software",
    description:
      "Optimizacion y mantenimiento de sistemas operativos. Mantene tu equipo funcionando al maximo.",
    details: [
      "Limpieza de virus y malware",
      "Optimizacion de Windows/Linux",
      "Instalacion de Office y software",
      "Configuracion de backups automaticos",
      "Recuperacion de datos",
    ],
  },
  {
    icon: Wrench,
    title: "Hardware",
    description:
      "Reparacion y upgrade de componentes. Diagnostico profesional y repuestos de calidad.",
    details: [
      "Reparacion de notebooks y PCs",
      "Cambio de discos HDD a SSD",
      "Limpieza fisica y cambio de pasta termica",
      "Cambio de pantallas y teclados",
      "Upgrade de memoria RAM",
    ],
  },
  {
    icon: Network,
    title: "Redes",
    description:
      "Soluciones de conectividad para hogares y empresas. Wifi estable y seguro.",
    details: [
      "Configuracion de routers",
      "Extension de cobertura Wi-Fi",
      "Cableado estructurado para empresas",
      "Configuracion de VPN",
      "Seguridad de red",
    ],
  },
  {
    icon: Building2,
    title: "Abonos Empresariales",
    description:
      "Planes de soporte mensual para tu empresa. Atencion prioritaria y preventiva.",
    details: [
      "Mantenimiento preventivo mensual",
      "Soporte remoto ilimitado",
      "Atencion prioritaria 24hs",
      "Descuentos en repuestos",
      "Informes tecnicos mensuales",
    ],
  },
];

function ServicesSection() {
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: (typeof services)[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section id="servicios" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            Nuestros Servicios
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-5xl">
            Soluciones informaticas
            <span className="text-cyan-400"> integrales</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-slate-400">
            Ofrecemos un servicio completo para particulares y empresas.
            Tecnologia de punta y atencion personalizada.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                borderColor: "#06b6d4",
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
              }}
              transition={{ duration: 0.3 }}
              onClick={() => openModal(service)}
              className="group cursor-pointer rounded-2xl border border-slate-700 bg-[#1e293b]/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 transition-all group-hover:from-cyan-500 group-hover:to-cyan-600">
                <service.icon className="h-7 w-7 text-cyan-400 transition-colors group-hover:text-[#0f172a]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>
              <span className="text-sm font-medium text-cyan-400 transition-colors group-hover:text-cyan-300">
                Ver detalles
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}

// Features Section
const features = [
  {
    icon: Shield,
    title: "Garantia en todos los trabajos",
  },
  {
    icon: Clock,
    title: "Respuesta rapida y eficiente",
  },
  {
    icon: Award,
    title: "Tecnicos certificados",
  },
];

// Location Section with Map
function LocationSection() {
  return (
    <section id="ubicacion" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            <MapPin className="mr-2 inline-block h-4 w-4" />
            Nuestra Ubicacion
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-5xl">
            Visitanos en{" "}
            <span className="text-cyan-400">Venado Tuerto</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-slate-400">
            Estamos ubicados en el centro de la ciudad para brindarte un servicio
            rapido y accesible.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <AnimatedSection>
      <div className="overflow-hidden rounded-2xl border border-slate-700">
        <iframe
          // CAMBIAMOS EL SRC POR NUESTRA VARIABLE:
          src={MAP_EMBED_URL}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          // Mantenemos el filtro grayscale para el estilo tech si querés
          className="grayscale invert-[0.9] hue-rotate-180" 
          title={`Ubicacion de ${CONFIG.nombreNegocio}`}
        />
      </div>
    </AnimatedSection>

          {/* Info */}
          <AnimatedSection className="flex flex-col justify-center">
            <div className="rounded-2xl border border-slate-700 bg-[#1e293b]/50 p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Control Servicios Informaticos
              </h3>

              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20">
                    <MapPin className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Direccion</p>
                    <p className="text-slate-400">
                      {CONFIG.direccion}, {CONFIG.ciudad}, {CONFIG.provincia}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20">
                    <Clock className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Horario de Atencion</p>
                    <p className="text-slate-400">{CONFIG.horario}</p>
                    <p className="mt-1 text-sm text-cyan-400">
                      Urgencias: 24hs por WhatsApp
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20">
                    <Phone className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Telefono</p>
                    <p className="text-slate-400">{CONFIG.telefonoFormateado}</p>
                  </div>
                </div>
              </div>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 font-semibold text-[#0f172a] transition-all hover:from-orange-500 hover:to-orange-600"
              >
                <MessageCircle className="h-5 w-5" />
                Contactar por WhatsApp
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Local Feature Section
function LocalSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-[#1e293b] to-[#0f172a]">
          <div className="grid items-center lg:grid-cols-2">
            <AnimatedSection className="p-8 md:p-12 lg:p-16">
              <span className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
                <MapPin className="mr-2 inline-block h-4 w-4" />
                {CONFIG.ciudad}, {CONFIG.provincia}
              </span>
              <h2 className="mb-6 text-balance text-3xl font-bold text-white md:text-4xl">
                Lideres en Soporte Tecnico en{" "}
                <span className="text-cyan-400">{CONFIG.ciudad} y zona</span>
              </h2>
              <p className="mb-8 text-pretty leading-relaxed text-slate-400">
                Desde hace {CONFIG.añosExperiencia} años, somos la empresa de confianza para
                cientos de comercios, profesionales y familias de la region. Nos
                enorgullece ser parte del crecimiento tecnologico de nuestra
                ciudad.
              </p>

              <div className="mb-8 space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20">
                      <feature.icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <span className="text-white">{feature.title}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3 font-semibold text-[#0f172a] transition-all hover:from-orange-500 hover:to-orange-600"
              >
                <MessageCircle className="h-5 w-5" />
                Solicita un presupuesto
              </motion.a>
            </AnimatedSection>

            <div className="relative hidden h-full min-h-[400px] lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b] to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-8xl font-bold text-cyan-500/20">
                    {CONFIG.nombreNegocio}
                  </div>
                  <p className="text-slate-500">{CONFIG.ciudad}, {CONFIG.provincia}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const reviewsBase = [
  {
    name: "Carlos Rodríguez",
    role: "Comercio Centro",
    text: "Excelente atención. Lleve la notebook del negocio que no arrancaba y en 24hs la tuvieron lista con cambio de SSD. Salvaron mis archivos.",
    stars: 5,
  },
  {
    name: "María Laura B.",
    role: "Profesional Independiente",
    text: "Muy profesionales. Instalaron el sistema operativo y optimizaron mi PC de escritorio. Ahora vuela. Super recomendables en Venado.",
    stars: 5,
  },
  {
    name: "Estudio Contable VT",
    role: "Abono Mensual",
    text: "Tenemos el abono de mantenimiento para nuestras oficinas. Ante cualquier problema de red responden al instante. Un alivio técnico.",
    stars: 5,
  },
];
const reviews = RESEÑA_EN_VIVO.mostrar 
  ? [{ name: RESEÑA_EN_VIVO.name, role: RESEÑA_EN_VIVO.role, text: RESEÑA_EN_VIVO.text, stars: 5 }, ...reviewsBase]
  : reviewsBase;

function ReviewsSection() {
  return (
    <section id="reseñas" className="px-4 py-24 border-t border-slate-800 bg-[#0f172a]/30">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            Opiniones de Clientes
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-5xl">
            La confianza de nuestra <span className="text-cyan-400">comunidad</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-slate-400">
            Mirá lo que dicen los comercios y profesionales de Venado Tuerto que ya confían en nuestro soporte técnico.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-700 bg-[#1e293b]/40 p-6 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="mb-4 flex gap-1 text-amber-400">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mb-6 text-sm italic leading-relaxed text-slate-300">
                  "{review.text}"
                </p>
              </div>
              <div className="border-t border-slate-700/50 pt-4">
                <p className="font-semibold text-white">{review.name}</p>
                <p className="text-xs text-cyan-400">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// FAQ Section
const faqs = [
  {
    question: "Cuanto demora una reparacion?",
    answer:
      "Generalmente entre 24 y 48 horas dependiendo del repuesto. Para reparaciones mas complejas o que requieran piezas especiales, te informamos el tiempo estimado antes de comenzar.",
  },
  {
    question: "Hacen servicio a domicilio en la zona?",
    answer:
      "Si, cubrimos Venado Tuerto y localidades vecinas para empresas y hogares. El servicio a domicilio tiene un costo adicional segun la distancia.",
  },
  {
    question: "Tienen garantia?",
    answer:
      "Todos nuestros trabajos cuentan con garantia tecnica de 90 dias. Los repuestos originales tienen la garantia del fabricante.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            Preguntas Frecuentes
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-5xl">
            Dudas <span className="text-cyan-400">comunes</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-slate-400">
            Respuestas a las preguntas mas frecuentes de nuestros clientes.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index}>
              <motion.div
                className="overflow-hidden rounded-xl border border-slate-700 bg-[#1e293b]/50"
                initial={false}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-cyan-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="border-t border-slate-700 px-6 py-4 text-slate-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Infinite Slider
const clients = [
  "Comercios Locales",
  "Estudios Contables",
  "Clinicas",
  "Escribanias",
  "Pymes",
  "Profesionales",
  "Industrias",
  "Cooperativas",
];

function InfiniteSlider() {
  return (
    <section className="overflow-hidden border-y border-slate-800 bg-[#0f172a]/50 py-8">
      <div className="flex gap-8">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex shrink-0 gap-8"
        >
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3"
            >
              <Building2 className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-300">{client}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex shrink-0 gap-8"
        >
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3"
            >
              <Building2 className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-300">{client}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer id="contacto" className="border-t border-slate-800 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600">
                <Monitor className="h-5 w-5 text-[#0f172a]" />
              </div>
              <span className="text-lg font-bold text-white">
                Control<span className="text-cyan-400">SI</span>
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              {CONFIG.nombreNegocio}. Tu partner tecnologico de
              confianza en {CONFIG.ciudad}.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Servicios</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#servicios" className="transition-colors hover:text-cyan-400">
                  Soporte de Software
                </a>
              </li>
              <li>
                <a href="#servicios" className="transition-colors hover:text-cyan-400">
                  Reparacion de Hardware
                </a>
              </li>
              <li>
                <a href="#servicios" className="transition-colors hover:text-cyan-400">
                  Redes y Conectividad
                </a>
              </li>
              <li>
                <a href="#servicios" className="transition-colors hover:text-cyan-400">
                  Abonos Empresariales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Contacto</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2" suppressHydrationWarning>
                <Phone className="h-4 w-4 text-cyan-400" />
                {CONFIG.telefonoFormateado}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-400" />
                {CONFIG.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                {CONFIG.direccion}
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Horarios</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>{CONFIG.horario}</li>
              <li className="text-cyan-400">Urgencias: 24hs por WhatsApp</li>
            </ul>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </motion.a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            {CONFIG.añoActual} {CONFIG.nombreNegocio}. Todos los derechos reservados.
          </p>
          <p className="text-sm text-slate-500">{CONFIG.ciudad}, {CONFIG.provincia}</p>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp Button
function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 transition-colors hover:bg-orange-500 hover:shadow-orange-500/30"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <MessageCircle className="h-7 w-7" />
      </motion.div>
    </motion.a>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0f172a]">
      <Navbar />
      <HeroSection />
      <BrandLogos />
      <InfiniteSlider />
      <ServicesSection />
      <LocationSection />
      <LocalSection />
      <ReviewsSection />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
