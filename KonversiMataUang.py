import streamlit as st
from forex_python.converter import CurrencyRates, CurrencyCodes
import datetime
import time
import pytz

def main():
    # Inisialisasi konverter mata uang
    c = CurrencyRates()
    cc = CurrencyCodes()

    # Daftar mata uang yang tersedia dengan informasi tambahan
    CURRENCIES_INFO = {
        'USD': {'name': 'US Dollar', 'symbol': '$', 'country': 'United States'},
        'EUR': {'name': 'Euro', 'symbol': '€', 'country': 'European Union'},
        'GBP': {'name': 'British Pound', 'symbol': '£', 'country': 'United Kingdom'},
        'JPY': {'name': 'Japanese Yen', 'symbol': '¥', 'country': 'Japan'},
        'AUD': {'name': 'Australian Dollar', 'symbol': 'A$', 'country': 'Australia'},
        'CAD': {'name': 'Canadian Dollar', 'symbol': 'C$', 'country': 'Canada'},
        'CHF': {'name': 'Swiss Franc', 'symbol': 'CHF', 'country': 'Switzerland'},
        'CNY': {'name': 'Chinese Yuan', 'symbol': '¥', 'country': 'China'},
        'IDR': {'name': 'Indonesian Rupiah', 'symbol': 'Rp', 'country': 'Indonesia'},
        'INR': {'name': 'Indian Rupee', 'symbol': '₹', 'country': 'India'},
        'SGD': {'name': 'Singapore Dollar', 'symbol': 'S$', 'country': 'Singapore'},
        'MYR': {'name': 'Malaysian Ringgit', 'symbol': 'RM', 'country': 'Malaysia'},
        'THB': {'name': 'Thai Baht', 'symbol': '฿', 'country': 'Thailand'},
        'KRW': {'name': 'South Korean Won', 'symbol': '₩', 'country': 'South Korea'},
        'AED': {'name': 'UAE Dirham', 'symbol': 'د.إ', 'country': 'United Arab Emirates'},
        'SAR': {'name': 'Saudi Riyal', 'symbol': '﷼', 'country': 'Saudi Arabia'},
        'BRL': {'name': 'Brazilian Real', 'symbol': 'R$', 'country': 'Brazil'},
        'MXN': {'name': 'Mexican Peso', 'symbol': 'Mex$', 'country': 'Mexico'},
        'RUB': {'name': 'Russian Ruble', 'symbol': '₽', 'country': 'Russia'},
        'ZAR': {'name': 'South African Rand', 'symbol': 'R', 'country': 'South Africa'},
        'TRY': {'name': 'Turkish Lira', 'symbol': '₺', 'country': 'Turkey'},
        'SEK': {'name': 'Swedish Krona', 'symbol': 'kr', 'country': 'Sweden'},
        'NOK': {'name': 'Norwegian Krone', 'symbol': 'kr', 'country': 'Norway'},
        'DKK': {'name': 'Danish Krone', 'symbol': 'kr', 'country': 'Denmark'},
        'HKD': {'name': 'Hong Kong Dollar', 'symbol': 'HK$', 'country': 'Hong Kong'},
        'NZD': {'name': 'New Zealand Dollar', 'symbol': 'NZ$', 'country': 'New Zealand'},
        'PHP': {'name': 'Philippine Peso', 'symbol': '₱', 'country': 'Philippines'},
        'VND': {'name': 'Vietnamese Dong', 'symbol': '₫', 'country': 'Vietnam'},
        'BDT': {'name': 'Bangladeshi Taka', 'symbol': '৳', 'country': 'Bangladesh'},
        'PKR': {'name': 'Pakistani Rupee', 'symbol': '₨', 'country': 'Pakistan'},
        'EGP': {'name': 'Egyptian Pound', 'symbol': 'E£', 'country': 'Egypt'},
        'PLN': {'name': 'Polish Zloty', 'symbol': 'zł', 'country': 'Poland'},
        'HUF': {'name': 'Hungarian Forint', 'symbol': 'Ft', 'country': 'Hungary'},
        'CZK': {'name': 'Czech Koruna', 'symbol': 'Kč', 'country': 'Czech Republic'},
        'RON': {'name': 'Romanian Leu', 'symbol': 'lei', 'country': 'Romania'},
        'ILS': {'name': 'Israeli Shekel', 'symbol': '₪', 'country': 'Israel'},
        'CLP': {'name': 'Chilean Peso', 'symbol': 'CLP$', 'country': 'Chile'},
        'COP': {'name': 'Colombian Peso', 'symbol': 'COL$', 'country': 'Colombia'},
        'ARS': {'name': 'Argentine Peso', 'symbol': 'AR$', 'country': 'Argentina'},
        'PEN': {'name': 'Peruvian Sol', 'symbol': 'S/', 'country': 'Peru'},
        'KWD': {'name': 'Kuwaiti Dinar', 'symbol': 'KD', 'country': 'Kuwait'},
        'QAR': {'name': 'Qatari Riyal', 'symbol': 'QR', 'country': 'Qatar'},
        'OMR': {'name': 'Omani Rial', 'symbol': 'OMR', 'country': 'Oman'},
        'BHD': {'name': 'Bahraini Dinar', 'symbol': 'BD', 'country': 'Bahrain'},
    }

    CURRENCIES = list(CURRENCIES_INFO.keys())

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
            'favorit': [],
            'timezone': 'Asia/Jakarta'
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
            
            # Set timezone
            tz = pytz.timezone(st.session_state.converter['timezone'])
            waktu_sekarang = datetime.datetime.now(tz)
            st.session_state.converter['waktu_update'] = waktu_sekarang.strftime("%Y-%m-%d %H:%M:%S (%Z)")
            
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

    def get_currency_info(currency_code):
        """Mendapatkan informasi mata uang"""
        info = CURRENCIES_INFO.get(currency_code, {})
        symbol = cc.get_symbol(currency_code) or info.get('symbol', '')
        name = cc.get_currency_name(currency_code) or info.get('name', currency_code)
        country = info.get('country', 'Unknown')
        
        return {
            'code': currency_code,
            'symbol': symbol,
            'name': name,
            'country': country
        }

    # Inisialisasi session state
    if 'converter' not in st.session_state:
        init_converter()

    # =====================================
    # BAGIAN HEADER
    # =====================================
    st.title("💱 Aplikasi Konversi Mata Uang Pro")
    st.markdown("""
    Aplikasi canggih untuk mengkonversi nilai antara berbagai mata uang dunia dengan kurs terkini.
    """)
    
    st.markdown("---")

    # =====================================
    # BAGIAN PENGATURAN
    # =====================================
    with st.expander("⚙️ Pengaturan", expanded=False):
        st.session_state.converter['timezone'] = st.selectbox(
            "Zona Waktu:",
            pytz.all_timezones,
            index=pytz.all_timezones.index(st.session_state.converter['timezone'])
        )
    
    st.markdown("---")

    # =====================================
    # BAGIAN UTAMA KONVERSI
    # =====================================
    with st.expander("🔁 Konversi Mata Uang", expanded=True):
        col1, col2, col3 = st.columns([2, 2, 3])
        
        with col1:
            dari_info = get_currency_info(st.session_state.converter['dari_uang'])
            st.session_state.converter['dari_uang'] = st.selectbox(
                "Dari Mata Uang:",
                CURRENCIES,
                index=CURRENCIES.index(st.session_state.converter['dari_uang']),
                format_func=lambda x: f"{x} - {CURRENCIES_INFO[x]['name']}",
                key="dari_uang_select"
            )
        
        with col2:
            ke_info = get_currency_info(st.session_state.converter['ke_uang'])
            st.session_state.converter['ke_uang'] = st.selectbox(
                "Ke Mata Uang:",
                CURRENCIES,
                index=CURRENCIES.index(st.session_state.converter['ke_uang']),
                format_func=lambda x: f"{x} - {CURRENCIES_INFO[x]['name']}",
                key="ke_uang_select"
            )
        
        with col3:
            st.session_state.converter['jumlah'] = st.number_input(
                f"Jumlah ({dari_info['symbol']}):",
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
                    {dari_info['symbol']}{st.session_state.converter['jumlah']:.2f} {st.session_state.converter['dari_uang']} = 
                    {ke_info['symbol']}{st.session_state.converter['hasil']:,.2f} {st.session_state.converter['ke_uang']}
                </div>
                <div style="text-align: center; margin-top: 10px; color: #666;">
                    Kurs: 1 {st.session_state.converter['dari_uang']} = 
                    {st.session_state.converter['kurs_terakhir'].get('kurs', 0):.4f} {st.session_state.converter['ke_uang']}
                    <br>
                    Kurs Invers: 1 {st.session_state.converter['ke_uang']} = 
                    {st.session_state.converter['kurs_terakhir'].get('inverse', 0):.4f} {st.session_state.converter['dari_uang']}
                    <br>
                    Terakhir diperbarui: {st.session_state.converter['waktu_update']}
                </div>
            </div>
            """, unsafe_allow_html=True)
    
    st.markdown("---")

    # =====================================
    # BAGIAN INFORMASI MATA UANG
    # =====================================
    with st.expander("ℹ️ Informasi Mata Uang Terpilih"):
        col_info1, col_info2 = st.columns(2)
        
        with col_info1:
            dari_info = get_currency_info(st.session_state.converter['dari_uang'])
            st.subheader(f"Informasi {dari_info['code']}")
            st.markdown(f"""
            - **Nama Mata Uang**: {dari_info['name']}
            - **Simbol**: {dari_info['symbol']}
            - **Negara**: {dari_info['country']}
            """)
        
        with col_info2:
            ke_info = get_currency_info(st.session_state.converter['ke_uang'])
            st.subheader(f"Informasi {ke_info['code']}")
            st.markdown(f"""
            - **Nama Mata Uang**: {ke_info['name']}
            - **Simbol**: {ke_info['symbol']}
            - **Negara**: {ke_info['country']}
            """)
    
    st.markdown("---")

    # =====================================
    # BAGIAN KURS TERKINI
    # =====================================
    with st.expander("📊 Kurs Mata Uang Terkini"):
        st.markdown("""
        **Kurs terbaru untuk beberapa mata uang populer:**
        """)
        
        # Pilih beberapa mata uang populer
        popular_currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'SGD', 'IDR']
        
        # Dapatkan kurs terbaru
        try:
            # Buat tabel kurs
            kurs_data = []
            base = st.session_state.converter['dari_uang']
            
            for target in popular_currencies:
                if base != target:
                    try:
                        rate = c.get_rate(base, target)
                        inverse_rate = 1/rate
                        kurs_data.append({
                            "Pasangan": f"{base}/{target}",
                            "Kurs": f"{rate:.4f}",
                            "Invers": f"{inverse_rate:.4f}"
                        })
                    except:
                        continue
            
            st.dataframe(
                kurs_data,
                column_config={
                    "Pasangan": "Pasangan Mata Uang",
                    "Kurs": f"1 {base} ke Target",
                    "Invers": f"1 Target ke {base}"
                },
                hide_index=True,
                use_container_width=True
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
                    dari_info = get_currency_info(item['dari'])
                    ke_info = get_currency_info(item['ke'])
                    riwayat_display.append({
                        "Waktu": item['waktu'],
                        "Dari": f"{dari_info['symbol']}{item['jumlah']:.2f} {item['dari']}",
                        "Ke": f"{ke_info['symbol']}{item['hasil']:,.2f} {item['ke']}",
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
    
    stat1, stat2, stat3 = st.columns(3)
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
    
    with stat3:
        total_favorit = len(st.session_state.converter['favorit'])
        st.metric(
            "Total Favorit",
            total_favorit
        )
    
    st.markdown("---")

    # =====================================
    # BAGIAN INFORMASI & TIPS
    # =====================================
    with st.expander("📚 Panduan & Informasi"):
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
        - Untuk transaksi resmi, gunakan kurs dari bank atau money changer
        
        ### 💡 Tips:
        - Tambahkan pasangan mata uang yang sering Anda gunakan ke favorit
        - Gunakan riwayat untuk melacak konversi sebelumnya
        - Untuk konversi besar, periksa kurs terbaru karena bisa berubah setiap saat
        - Perhatikan waktu update untuk mengetahui kapan terakhir kali kurs diperbarui
        
        ### 🌍 Zona Waktu:
        - Anda bisa mengubah zona waktu di bagian pengaturan
        - Waktu update akan disesuaikan dengan zona waktu yang dipilih
        """)

    # =====================================
    # BAGIAN DEVELOPER
    # =====================================
    st.markdown("---")
    with st.expander("👨‍💻 Tentang Pengembang"):
        st.markdown("""
        ### Aplikasi Konversi Mata Uang Pro
        **Versi:** 2.0.0  
        **Terakhir Diperbarui:** 2025-7-23  
        
       Pengembang:
        - **Developer:** Arief Rachman Apriansyah
        
        ### 📧 Kontak:
        - Email: rianscollege@gmail.com
        - GitHub: [github.com/Riansyah96](https://github.com/Riansyah96)
        
        ### 🤝 Berkontribusi:
        Kami menerima kontribusi dari developer lain. Kunjungi repositori GitHub kami untuk informasi lebih lanjut.
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