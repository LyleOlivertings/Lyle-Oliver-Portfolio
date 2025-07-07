"use client";
import React from "react";
import clientSites from "@/data/clientSites";

export default function ClientWorkPage() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-black text-center mb-12">
        Websites I’ve Built
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {clientSites.map((site) => (
          <div
            key={site.url}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-200"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <iframe
                src={site.url}
                title={site.name}
                className="w-full h-full border-none"
                loading="lazy"
              />
            </div>
            <div className="p-5 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  {site.name}
                </a>
              </h2>
              {site.description && (
                <p className="text-sm text-gray-500">{site.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
