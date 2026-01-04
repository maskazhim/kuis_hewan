
import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants';

interface AdminPanelProps {
  onLogout: () => void;
}

interface CodeData {
  code: string;
  animalLimit: string | number;
  deviceLimit: string | number;
  expiryDays: string | number;
  usageCount: number;
  note: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [codes, setCodes] = useState<CodeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState('');

  const fetchCodes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCodes(data);
      } else {
        setError('Gagal memuat data');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;
    setLoading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          code: newCode.toUpperCase(),
          animalLimit: 'UNLIMITED',
          deviceLimit: 'UNLIMITED',
          expiryDays: 365,
          note: newNote
        })
      });
      setNewCode('');
      setNewNote('');
      // Delay sedikit karena Google Script butuh waktu
      setTimeout(fetchCodes, 1500);
    } catch (err) {
      setError('Gagal menambah kode');
      setLoading(false);
    }
  };

  const handleDelete = async (codeToDelete: string) => {
    if (!confirm(`Hapus kode ${codeToDelete}?`)) return;
    setLoading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          code: codeToDelete
        })
      });
      setTimeout(fetchCodes, 1500);
    } catch (err) {
      setError('Gagal menghapus kode');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="p-4 bg-orange-500 text-white flex justify-between items-center shadow-md">
        <h2 className="text-xl font-black">Pengelola Kode Akses</h2>
        <button onClick={onLogout} className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold text-sm shadow active:scale-95">
          KELUAR
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 bg-stone-50">
        
        {/* Form Tambah */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-stone-100 mb-6">
          <h3 className="font-bold text-stone-700 mb-3">TAMBAH KODE BARU</h3>
          <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-2">
            <input 
              type="text" 
              placeholder="KODE (CONTOH: SISWA1)" 
              className="flex-1 p-3 border-2 border-stone-200 rounded-xl font-bold uppercase bg-white text-black"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="CATATAN (OPSIONAL)" 
              className="flex-1 p-3 border-2 border-stone-200 rounded-xl bg-white text-black"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button disabled={loading} type="submit" className="bg-green-500 text-white px-6 py-3 rounded-xl font-black shadow-[0_4px_0_rgb(22,163,74)] active:translate-y-1 active:shadow-none disabled:opacity-50">
              {loading ? '...' : 'TAMBAH'}
            </button>
          </form>
          {error && <p className="text-red-500 font-bold text-sm mt-2">{error}</p>}
        </div>

        {/* Tabel Data */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-100 text-stone-600 font-black uppercase text-xs">
                <tr>
                  <th className="p-4">KODE</th>
                  <th className="p-4">PENGGUNAAN</th>
                  <th className="p-4">CATATAN</th>
                  <th className="p-4 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm font-bold text-stone-700">
                {loading && codes.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-stone-400">MEMUAT DATA...</td></tr>
                ) : codes.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-stone-400">BELUM ADA KODE</td></tr>
                ) : (
                  codes.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-4 font-black text-blue-600">{item.code}</td>
                      <td className="p-4">
                        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-xs">
                          {item.usageCount || 0} x
                        </span>
                      </td>
                      <td className="p-4 text-stone-500">{item.note || '-'}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(item.code)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
