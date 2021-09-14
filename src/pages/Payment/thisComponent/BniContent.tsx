import React from 'react';
import { Text } from '../../../components/Styled';

const BniContent = (props: any) => {
    const { tabActive, vaNumber } = props;
    return (
        <>
            {tabActive === 'm-banking' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Akses BNI Mobile Banking melalui handphone</Text>
                    <Text block extraSmall>2. Masukkan User ID dan Password</Text>
                    <Text block extraSmall>3. Pilih menu &quot;Transfer&quot;</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih menu &quot;Virtual Account Billing&quot;, lalu pilih rekening debet</Text>
                    <Text block extraSmall>{`2. Masukkan Nomor Virtual Account anda ${vaNumber} pada menu "Input Baru"`}</Text>
                    <Text block extraSmall>3. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</Text>
                    <Text block extraSmall>4. Konfirmasi transaksi dan masukkan Password Transaksi</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</Text>
                    <Text block extraSmall>2. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
            {tabActive === 'i-banking' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>
                        1. Buka situs
                        <a href="https://ibank.bni.co.id" style={{ fontWeight: 500 }} target="_blank" rel="noopener noreferrer"> https://ibank.bni.co.id</a>
                    </Text>
                    <Text block extraSmall>2. Masukkan User ID dan Password</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih menu &quot;Transfer&quot;</Text>
                    <Text block extraSmall>2. Pilih menu &quot;Virtual Account Billing&quot;</Text>
                    <Text block extraSmall>{`3. Masukkan Nomor Virtual Account ${vaNumber}`}</Text>
                    <Text block extraSmall>4. Lalu pilih rekening debet yang akan digunakan. Kemudian tekan &quot;Lanjut&quot;</Text>
                    <Text block extraSmall>5. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</Text>
                    <Text block extraSmall>6. Masukkan Kode Otentikasi Token</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</Text>
                    <Text block extraSmall>2. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
            {tabActive === 'atm' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Masukkan kartu ATM anda</Text>
                    <Text block extraSmall>2. Pilih bahasa</Text>
                    <Text block extraSmall>3. Masukkan PIN ATM anda</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih &quot;Menu Lainnya&quot;</Text>
                    <Text block extraSmall>2. Pilih &quot;Transfer&quot;</Text>
                    <Text block extraSmall>3. Pilih jenis rekening yang akan anda gunakan (contoh: &quot;Dari Rekening Tabungan&quot;)</Text>
                    <Text block extraSmall>4. Pilih &quot;Virtual Account Billing&quot;</Text>
                    <Text block extraSmall>{`5. Masukkan Nomor Virtual Account ${vaNumber}, lalu tekan "BENAR"`}</Text>
                    <Text block extraSmall>6. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</Text>
                    <Text block extraSmall>7. Konfirmasi, apabila telah sesuai, lanjutkan transaksi</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Simpan bukti transaksi anda</Text>
                    <Text block extraSmall>2. Transaksi anda berhasil</Text>
                    <Text block extraSmall>3. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
        </>
    );
};

export default BniContent;
