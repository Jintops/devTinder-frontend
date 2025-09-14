import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router";
import AboutSection from './AboutSection';

const HeroSection = () => {
  return (
     <section className="py-10   mx-auto flex-1 px-5 flex flex-col items-center justify-center text-neutral-content ">
            <div className="flex lg:flex-row lg:gap-0 gap-7 flex-col items-center justify-center container mx-auto">
                <div className="flex-1 space-y-3">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">Connect with developers who match your vibe</h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl text-white">
                        Swipe right on talent. DevTinder helps you find the perfect coding partner, mentor, or team member based on skills, interests,
                        and coding style.
                    </p>
                    <div className="flex gap-4 items-center mt-5">
                        <Link to="/login">
                            <button className="btn bg-indigo-600  hover:bg-indigo-700 w-36 h-11 text-white">
                                Get Started
                                <FaArrowRight />
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="btn btn-dash w-36 h-11 text-white border border-dotted border-white hover:border-none ">Learn more</button>
                        </Link>
                    </div>
                </div>
                <div className="flex-1">
                    <img
                        src="/public/asset/deveoper.png"
                        loading="lazy"
                        alt="hero-img"
                        className="block w-[630px]"
                    />
                </div>
            </div>
            <AboutSection/>
        </section>
        
  )
}


export default HeroSection