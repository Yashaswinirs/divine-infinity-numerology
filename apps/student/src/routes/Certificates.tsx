import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { CertificateService } from '../services/certificate.service';
import { Award, ExternalLink, Download } from 'lucide-react';
import type { Certificate } from '@divine/types';

export const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CertificateService.getMyCertificates()
      .then(setCertificates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex bg-[#0e081e]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Earned Certificates" />

        <main className="flex-1 p-8 space-y-6 max-w-6xl w-full">
          <div>
            <h3 className="text-xl font-bold text-white">Your Professional Certifications</h3>
            <p className="text-xs text-[#ffd8a2]/70 mt-1">
              Official verifiable credentials issued by Divine Infinity & Master Numerologist Tejasswini.
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-[#ffd8a2]/50">Loading certificates...</div>
          ) : certificates.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <Award className="size-8 mx-auto text-[#ffd8a2]/50" />
              <p className="text-sm text-[#ffd8a2]">No certificates earned yet.</p>
              <p className="text-xs text-[#fff0db]/60">Complete 100% of any enrolled course to unlock your certificate.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-[#140e2b] border border-[#ffd8a2]/25 rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between space-y-6"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <Award className="size-36 text-[#ffd8a2]" />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffd8a2] px-2.5 py-1 rounded-full bg-[#ffd8a2]/10 border border-[#ffd8a2]/20 inline-block">
                      Verified Credential
                    </span>
                    <h4 className="text-lg font-bold text-white">{cert.courseTitle}</h4>
                    <p className="text-xs text-[#fff0db]/70">
                      Awarded to <span className="font-semibold text-white">{cert.studentName}</span>
                    </p>
                    <p className="text-[11px] text-[#ffd8a2]/60 font-mono">
                      Certificate No: {cert.certificateNumber}
                    </p>
                    <p className="text-[11px] text-[#ffd8a2]/60">
                      Issue Date: {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#ffd8a2] hover:underline flex items-center gap-1.5"
                    >
                      <ExternalLink className="size-3.5" />
                      Verify Online
                    </a>

                    <a
                      href={cert.pdfUrl}
                      download
                      className="px-4 py-2 bg-[#ffd8a2] text-[#0e081e] text-xs font-bold rounded-xl shadow hover:bg-[#c99e64] transition-colors flex items-center gap-1.5"
                    >
                      <Download className="size-3.5" />
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
