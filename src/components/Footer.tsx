"use client";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" text-black py-12 px-6 border-t ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            <span className="font-semibold text-base">Tokopidia</span> is an
            e-commerce platform that offers a wide range of everyday products at
            competitive prices. The website makes online shopping convenient,
            featuring everything from electronics, clothing, food, to household
            items, all in one place.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <p className="hover:text-green-500">Home</p>
            </li>
            <li>
              <p className="hover:text-green-500">About Us</p>
            </li>
            <li>
              <p className="hover:text-green-500">Contact</p>
            </li>
            <li>
              <p className="hover:text-green-500">Terms of Service</p>
            </li>
            <li>
              <p className="hover:text-green-500">Privacy Policy</p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <Link
              href="https://www.facebook.com/WahyudiAdityaPratama/"
              className="text-xl hover:text-green-500"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://www.linkedin.com/in/wahyudi-aditya-pratama-5429a7249/"
              className="text-xl hover:text-green-500"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://www.instagram.com/wahyudiaditya_"
              className="text-xl hover:text-green-500"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://github.com/wahyudiaditya"
              className="text-xl hover:text-green-500"
            >
              <FaGithub />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Phone: +62 815 3533 7621</li>
            <li>Email: wahyudiaditya@gmail.com</li>
            <li>Address: jl. Pasar kojengkang, Bekasi, Indonesia</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-12 border-t pt-6 text-sm">
        <p>&copy; 2025 Tokopidia. All rights reserved.</p>
      </div>
    </footer>
  );
}
