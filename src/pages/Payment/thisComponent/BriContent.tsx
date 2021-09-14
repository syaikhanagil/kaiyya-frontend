import React from 'react';
import { Text } from '../../../components/Styled';

const BriContent = (props: any) => {
    const { tabActive, vaNumber } = props;
    return (
        <>
            {tabActive === 'm-banking' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Buka aplikasi BRI Mobile Banking, masukkan USER ID dan PIN anda</Text>
                    <Text block extraSmall>2. Pilih &quot;Pembayaran&quot; dan pilih &quot;Briva&quot;</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>{`1. Masukkan Nomor Virtual Account anda ${vaNumber} dan jumlah yang ingin anda bayarkan`}</Text>
                    <Text block extraSmall>2. Masukkan PIN Mobile Banking BRI</Text>
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
                        <a href="https://ib.bri.co.id/ib-bri/" style={{ fontWeight: 500 }} target="_blank" rel="noopener noreferrer"> https://ib.bri.co.id/ib-bri/</a>
                        , dan masukkan USER ID dan PASSWORD anda
                    </Text>
                    <Text block extraSmall>2. Pilih &quot;Pembayaran&quot; dan pilih &quot;Briva&quot;</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>{`1. Masukkan Nomor Virtual Account ${vaNumber} dan jumlah yang ingin anda bayarkan`}</Text>
                    <Text block extraSmall>2. Masukkan password anda kemudian masukkan mToken internet banking</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</Text>
                    <Text block extraSmall>2. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
            {tabActive === 'atm' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Masukkan kartu, kemudian pilih bahasa dan masukkan PIN anda</Text>
                    <Text block extraSmall>2. Pilih &quot;Transaksi Lain&quot; dan pilih &quot;Pembayaran&quot;</Text>
                    <Text block extraSmall>3. Pilih menu &quot;Lainnya&quot; dan pilih &quot;Briva&quot;</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>{`1. Masukkan Nomor Virtual Account ${vaNumber} dan jumlah yang ingin anda bayarkan`}</Text>
                    <Text block extraSmall>2. Periksa data transaksi dan tekan &quot;YA&quot;</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Simpan bukti transaksi anda</Text>
                    <Text block extraSmall>3. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
        </>
    );
};

export default BriContent;
