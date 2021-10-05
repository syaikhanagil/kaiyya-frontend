import React from 'react';
import { Text } from '../../../components/Styled';

const MandiriContent = (props: any) => {
    const { tabActive, vaNumber } = props;
    return (
        <>
            {tabActive === 'm-banking' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Buka aplikasi Mandiri Online, masukkan USERNAME dan PASSWORD anda</Text>
                    <Text block extraSmall>2. Pilih &quot;Bayar&quot;</Text>
                    <Text block extraSmall>3. Pilih &quot;Multipayment&quot;</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>{`1. Pilih ${vaNumber.substring(0, 5)} XENDIT sebagai penyedia jasa`}</Text>
                    <Text block extraSmall>{`2. Masukkan Nomor Virtual Account ${vaNumber}`}</Text>
                    <Text block extraSmall>3. Tekan Lanjut</Text>
                    <Text block extraSmall>4. Tinjau dan konfirmasi detail transaksi anda, lalu tekan Konfirmasi</Text>
                    <Text block extraSmall>5. Selesaikan transaksi dengan memasukkan MPIN anda</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</Text>
                    <Text block extraSmall>2. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
            {tabActive === 'i-banking' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>
                        1. Buka situs Mandiri Internet Banking
                        <a href="https://ibank.bankmandiri.co.id" style={{ fontWeight: 500 }} target="_blank" rel="noopener noreferrer"> https://ibank.bankmandiri.co.id </a>
                    </Text>
                    <Text block extraSmall>2. Masuk menggunakan USER ID dan PASSWORD anda</Text>
                    <Text block extraSmall>3. Buka halaman beranda, kemudian pilih &quot;Pembayaran&quot;</Text>
                    <Text block extraSmall>3. Pilih &quot;Multi Payment&quot;</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>{`1. Pilih ${vaNumber.substring(0, 5)} XENDIT sebagai penyedia jasa`}</Text>
                    <Text block extraSmall>{`2. Masukkan Nomor Virtual Account ${vaNumber}`}</Text>
                    <Text block extraSmall>3. Lalu pilih Lanjut</Text>
                    <Text block extraSmall>4. Apabila semua detail benar tekan &quot;KONFIRMASI&quot;</Text>
                    <Text block extraSmall>5. Masukkan PIN / Challenge Code Token</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</Text>
                    <Text block extraSmall>2. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
            {tabActive === 'atm' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Masukkan ATM dan tekan &quot;Bahasa Indonesia&quot;</Text>
                    <Text block extraSmall>2. Masukkan PIN, lalu tekan &quot;Benar&quot;</Text>
                    <Text block extraSmall>3. Pilih &quot;Pembayaran&quot;, lalu pilih &quot;Multi Payment&quot;</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>{`1. Masukkan kode perusahaan "${vaNumber.substring(0, 5)}" (${vaNumber.substring(0, 5)} XENDIT), lalu tekan  "BENAR"`}</Text>
                    <Text block extraSmall>{`2. Masukkan Nomor Virtual Account ${vaNumber}, lalu tekan "BENAR"`}</Text>
                    <Text block extraSmall>3. Masukkan nominal yang ingin di transfer, lalu tekan &quot;BENAR&quot;</Text>
                    <Text block extraSmall>4. Informasi pelanggan akan ditampilkan, pilih nomor 1 sesuai dengan nominal pembayaran kemudian tekan &quot;YA&quot;</Text>
                    <Text block extraSmall>5. Konfirmasi pembayaran akan muncul, tekan &quot;YA&quot;, untuk melanjutkan</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Simpan bukti transaksi anda</Text>
                    <Text block extraSmall>2. Transaksi anda berhasil</Text>
                    <Text block extraSmall>3. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
        </>
    );
};

export default MandiriContent;
