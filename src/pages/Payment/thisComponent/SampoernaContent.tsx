import React from 'react';
import { Text } from '../../../components/Styled';

const SampoernaContent = (props: any) => {
    const { tabActive, vaNumber } = props;
    return (
        <>
            {tabActive === 'm-banking' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Buka aplikasi PermataMobile Internet</Text>
                    <Text block extraSmall>2. Masukkan User ID dan Password</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih &quot;Pembayaran Tagihan&quot;</Text>
                    <Text block extraSmall>2. Pilih &quot;Virtual Account&quot;</Text>
                    <Text block extraSmall>{`3. Masukkan Nomor Virtual Account Anda ${vaNumber}`}</Text>
                    <Text block extraSmall>4. Masukkan otentikasi transaksi/token</Text>
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
                        <a href="https://new.permatanet.com/" style={{ fontWeight: 500 }} target="_blank" rel="noopener noreferrer"> https://new.permatanet.com/</a>
                    </Text>
                    <Text block extraSmall>2. Masukkan User ID dan Password</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih &quot;Pembayaran Tagihan&quot;</Text>
                    <Text block extraSmall>2. Pilih &quot;Virtual Account&quot;</Text>
                    <Text block extraSmall>{`3. Masukkan Nomor Virtual Account ${vaNumber}`}</Text>
                    <Text block extraSmall>4. Periksa kembali detail pembayaran anda</Text>
                    <Text block extraSmall>5. Masukkan otentikasi transaksi/token</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</Text>
                    <Text block extraSmall>2. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
            {tabActive === 'atm' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Masukkan kartu ATM Samperna anda</Text>
                    <Text block extraSmall>2. Masukkan PIN</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih menu &quot;Transaksi&quot;</Text>
                    <Text block extraSmall>2. Pilih &quot;Lainnya&quot;</Text>
                    <Text block extraSmall>3. Pilih menu &quot;Transfer&quot;</Text>
                    <Text block extraSmall>4. Pilih menu &quot;Virtual Account&quot;</Text>
                    <Text block extraSmall>{`5. Masukkan Nomor Virtual Account ${vaNumber}`}</Text>
                    <Text block extraSmall>6. Lalu pilih rekening debet yang akan digunakan</Text>
                    <Text block extraSmall>7. Konfirmasi detail transaksi anda</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Simpan bukti transaksi anda</Text>
                    <Text block extraSmall>3. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
        </>
    );
};

export default SampoernaContent;
