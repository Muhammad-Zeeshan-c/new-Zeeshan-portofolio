import { motion } from 'framer-motion';
import { TbBrandGithub } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  const Icons = [
    { icon: <TbBrandGithub />, Link: 'https://github.com/Muhammad-Zeeshan-c' },
    { icon: <FaLinkedin />, Link: ' https://www.linkedin.com/in/muhammad-zeeshan-khalid-665b3a327/' },
    { icon: <BsTwitterX />, Link: 'https://X.com/' }
  ]
  const glowVariants = {
    initial: { scale: 1, filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' },
    hover: { scale: 1.2, opacity: 1, filter: 'drop-shadow(0 0 10px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.9))' },
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  }
  return (
    <div className='relative h-[350px] w-full bg-black overflow-hidden
        flex flex-col items-center gap-6 justify-center'>
      {/* Fix below one glow */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.25),transparent_70%)]' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,188,129,0.25),transparent_70%)]' />
      <motion.div className='flex flex-col items-center justify-center gap-6 h-full w-full overflow-hidden'
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          type: "spring",
          stiffness: 15
        }}>

        <h1
          className='font-semibold text-2xl sm:text-4xl leading-none text-white text-center select-none'
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 14rem)',
            letterSpacing: '0.02em',
            lineHeight: 0.9,
            padding: '0 3vw',
            whiteSpace: 'normal',
            textShadow: '0 2px 18px rgba(0,0,0,0.4)'
          }}
        >
          Muhammad Zeeshan
        </h1>

        <div className='w-32 h-1 bg-gradient-to-r from-primary via-primary via-blue-400 to-blue-500'></div>
        <div className='flex flex-row gap-x-6'>
          {
            Icons.map((i, index) => (
              <motion.span
                key={index}
                variants={glowVariants}
                initial='initial'
                whileHover='hover'
                whileTap='tap'
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className='text-3xl text-white cursor-pointer'
              >
                <a
                  href={i.Link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-3xl text-white'
                >
                  {i.icon}
                </a>
              </motion.span>
            ))
          }
        </div>

        <div className=' flex flex-col items-center gap-2'>
          <span className='text-sm text-center xs:text-base text-white italic'>“Success is when preparation meets opportunity.”</span>

          <div className='text-xs text-white text-center'>
            © 2026 Muhammad Zeeshan. All rights reserved.
          </div>
        </div>
      </motion.div>
    </div>
  )
}

