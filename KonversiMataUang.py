import streamlit as st
from forex_python.converter import CurrencyRates
import datetime
import time

def main():
    # Inisialisasi konverter mata uang
    c = CurrencyRates()

    # Daftar mata uang yang tersedia
    CURRENCIES = [
        'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 
        'IDR', 'INR', 'SGD', 'MYR', 'THB', 'KRW', 'AED', 'SAR',
        'BRL', 'MXN', 'RUB', 'ZAR', 'TRY', 'SEK', 'NOK', 'DKK',
        'HKD', 'NZD', 'PHP', 'VND', 'BDT', 'PKR', 'EGP', 'PLN'
    ]

    def init_converter():
        """Inisialisasi state konverter"""
        st.session_state.converter = {
            'dari_uang': 'USD',
            'ke_uang': 'IDR',
            'jumlah': 1.0,
            'hasil': 0.0,
            'riwayat': [],
            'kurs_terakhir': {},
            'waktu_update': None,
            'total_konversi': 0,
            'favorit': []
        }

    def konversi_uang():
        """Melakukan konversi mata uang"""
        try:
            jumlah = float(st.session_state.converter['jumlah'])
            dari = st.session_state.converter['dari_uang']
            ke = st.session_state.converter['ke_uang']
            
            # Dapatkan kurs terbaru
            kurs = c.get_rate(dari, ke)
            hasil = jumlah * kurs
            
            st.session_state.converter['hasil'] = hasil
            st.session_state.converter['kurs_terakhir'] = {
                'dari': dari,
                'ke': ke,
                'kurs': kurs,
                'inverse': 1/kurs
            }
            st.session_state.converter['waktu_update'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            # Tambahkan ke riwayat
            st.session_state.converter['riwayat'].append({
                'waktu': st.session_state.converter['waktu_update'],
                'dari': dari,
                'ke': ke,
                'jumlah': jumlah,
                'hasil': hasil,
                'kurs': kurs
            })
            
            st.session_state.converter['total_konversi'] += 1
            
            return True
        except Exception as e:
            st.error(f"Error: {str(e)}")
            return False

    def tambah_favorit():
        """Menambahkan pasangan mata uang ke favorit"""
        pasangan = (
            st.session_state.converter['dari_uang'], 
            st.session_state.converter['ke_uang']
        )
        
        if pasangan not in st.session_state.converter['favorit']:
            st.session_state.converter['favorit'].append(pasangan)
            st.success("Ditambahkan ke favorit!")
        else:
            st.warning("Pasangan mata uang sudah ada di favorit")

    # Inisialisasi session state
    if 'converter' not in st.session_state:
        init_converter()

    # =====================================
    # BAGIAN HEADER
    # =====================================
    st.title("💱 Aplikasi Konversi Mata Uang")
    st.markdown("""
    Aplikasi ini memungkinkan Anda untuk mengkonversi nilai antara berbagai mata uang dunia 
    dengan menggunakan kurs terkini.
    """)
    
    st.markdown("---")

    # =====================================
    # BAGIAN UTAMA KONVERSI
    # =====================================
    with st.expander("🔁 Konversi Mata Uang", expanded=True):
        col1, col2, col3 = st.columns([2, 2, 3])
        
        with col1:
            st.session_state.converter['dari_uang'] = st.selectbox(
                "Dari Mata Uang:",
                CURRENCIES,
                index=CURRENCIES.index(st.session_state.converter['dari_uang']),
                key="dari_uang_select"
            )
        
        with col2:
            st.session_state.converter['ke_uang'] = st.selectbox(
                "Ke Mata Uang:",
                CURRENCIES,
                index=CURRENCIES.index(st.session_state.converter['ke_uang']),
                key="ke_uang_select"
            )
        
        with col3:
            st.session_state.converter['jumlah'] = st.number_input(
                "Jumlah:",
                min_value=0.01,
                value=float(st.session_state.converter['jumlah']),
                step=0.01,
                format="%.2f",
                key="jumlah_input"
            )
        
        # Tombol konversi
        if st.button("🔄 Konversi Sekarang", use_container_width=True):
            if konversi_uang():
                st.success("Konversi berhasil!")
        
        # Tampilkan hasil
        if st.session_state.converter['hasil'] > 0:
            st.markdown(f"""
            <div style="background-color: #f0f2f6; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h3 style="text-align: center; margin-bottom: 10px;">Hasil Konversi</h3>
                <div style="font-size: 24px; text-align: center; font-weight: bold;">
                    {st.session_state.converter['jumlah']:.2f} {st.session_state.converter['dari_uang']} = 
                    {st.session_state.converter['hasil']:.2f} {st.session_state.converter['ke_uang']}
                </div>
                <div style="text-align: center; margin-top: 10px; color: #666;">
                    Kurs: 1 {st.session_state.converter['dari_uang']} = 
                    {st.session_state.converter['kurs_terakhir'].get('kurs', 0):.4f} {st.session_state.converter['ke_uang']}
                    <br>
                    Terakhir diperbarui: {st.session_state.converter['waktu_update']}
                </div>
            </div>
            """, unsafe_allow_html=True)
    
    st.markdown("---")

    # =====================================
    # BAGIAN KURS TERKINI
    # =====================================
    with st.expander("📊 Kurs Mata Uang Terkini"):
        st.markdown("""
        **Kurs terbaru untuk beberapa mata uang populer (berdasarkan USD):**
        """)
        
        # Pilih beberapa mata uang populer
        popular_currencies = ['EUR', 'GBP', 'JPY', 'IDR', 'SGD', 'MYR', 'AUD', 'CAD']
        
        # Dapatkan kurs terbaru
        rates = {}
        base = 'USD'
        try:
            for currency in popular_currencies:
                rates[currency] = c.get_rate(base, currency)
            
            # Tampilkan dalam bentuk tabel
            cols = st.columns(4)
            for i, currency in enumerate(popular_currencies):
                with cols[i % 4]:
                    st.metric(
                        f"1 {base} = {rates[currency]:.4f} {currency}",
                        f"{currency}",
                        delta=f"{rates[currency]:.4f}"
                    )
        except Exception as e:
            st.error(f"Tidak dapat memperoleh kurs: {str(e)}")
    
    st.markdown("---")

    # =====================================
    # BAGIAN FAVORIT & RIWAYAT
    # =====================================
    col_fav, col_history = st.columns(2)
    
    with col_fav:
        with st.expander("⭐ Favorit Anda"):
            if st.session_state.converter['favorit']:
                st.write("Pasangan mata uang favorit Anda:")
                for i, (dari, ke) in enumerate(st.session_state.converter['favorit']):
                    cols = st.columns([3, 3, 2])
                    with cols[0]:
                        st.write(f"**{dari}** → **{ke}**")
                    with cols[1]:
                        if st.button("🔁", key=f"konversi_fav_{i}"):
                            st.session_state.converter['dari_uang'] = dari
                            st.session_state.converter['ke_uang'] = ke
                            st.rerun()
                    with cols[2]:
                        if st.button("❌", key=f"hapus_fav_{i}"):
                            st.session_state.converter['favorit'].remove((dari, ke))
                            st.rerun()
            else:
                st.write("Anda belum memiliki favorit")
            
            # Tombol tambah favorit
            if st.button("➕ Tambahkan ke Favorit", use_container_width=True):
                tambah_favorit()
    
    with col_history:
        with st.expander("🕒 Riwayat Konversi"):
            if st.session_state.converter['riwayat']:
                riwayat_display = []
                for item in st.session_state.converter['riwayat'][-5:][::-1]:  # Tampilkan 5 terakhir
                    riwayat_display.append({
                        "Waktu": item['waktu'],
                        "Dari": f"{item['jumlah']:.2f} {item['dari']}",
                        "Ke": f"{item['hasil']:.2f} {item['ke']}",
                        "Kurs": f"1 {item['dari']} = {item['kurs']:.4f} {item['ke']}"
                    })
                
                st.dataframe(
                    riwayat_display,
                    column_config={
                        "Waktu": "Waktu",
                        "Dari": "Dari",
                        "Ke": "Hasil",
                        "Kurs": "Kurs"
                    },
                    hide_index=True,
                    use_container_width=True
                )
            else:
                st.write("Belum ada riwayat konversi")
    
    st.markdown("---")

    # =====================================
    # BAGIAN STATISTIK
    # =====================================
    st.subheader("📈 Statistik Penggunaan")
    
    stat1, stat2 = st.columns(2)
    with stat1:
        st.metric(
            "Total Konversi",
            st.session_state.converter['total_konversi']
        )
    
    with stat2:
        last_update = st.session_state.converter['waktu_update'] or "Belum ada"
        st.metric(
            "Terakhir Diperbarui",
            last_update
        )
    
    st.markdown("---")

    # =====================================
    # BAGIAN INFORMASI
    # =====================================
    with st.expander("ℹ️ Informasi & Tips"):
        st.markdown("""
        ### 💰 Cara Menggunakan:
        1. Pilih mata uang asal (Dari Mata Uang)
        2. Pilih mata uang tujuan (Ke Mata Uang)
        3. Masukkan jumlah yang ingin dikonversi
        4. Klik tombol "Konversi Sekarang"
        
        ### ⚠️ Catatan Penting:
        - Kurs mata uang diperbarui secara real-time
        - Data kurs berasal dari API forex-python
        - Hasil konversi hanya sebagai perkiraan
        
        ### 💡 Tips:
        - Tambahkan pasangan mata uang yang sering Anda gunakan ke favorit
        - Gunakan riwayat untuk melacak konversi sebelumnya
        - Untuk konversi besar, periksa kurs terbaru karena bisa berubah setiap saat
        
        ### 📌 Mata Uang Populer:
        - USD: Dolar Amerika
        - EUR: Euro
        - GBP: Pound Sterling
        - JPY: Yen Jepang
        - IDR: Rupiah Indonesia
        - SGD: Dolar Singapura
        - MYR: Ringgit Malaysia
        """)

    # =====================================
    # BAGIAN RESET
    # =====================================
    if st.button("🔄 Reset Aplikasi", type="secondary", use_container_width=True):
        init_converter()
        st.success("Aplikasi telah direset!")
        time.sleep(1)
        st.rerun()

if __name__ == "__main__":
    main()