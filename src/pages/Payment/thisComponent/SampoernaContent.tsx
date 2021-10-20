import React from 'react';
import { Text } from '../../../components/Styled';

const SampoernaContent = (props: any) => {
    const { tabActive, vaNumber } = props;
    return (
        <>
            {tabActive === 'm-banking' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Login akun Mobile Banking pada handphone anda.</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih menu &quot;Transfer Dana&quot;</Text>
                    <Text block extraSmall>2. Pilih &quot;Transfer ke Antar Bank&quot;</Text>
                    <Text block extraSmall>3. Masukkan kode BANK SAHABAT SAMPOERNA yaitu 523, Pilih YA.</Text>
                    <Text block extraSmall>{`4. Masukkan 16 digit nomor rekening virtual account ${vaNumber}.`}</Text>
                    <Text block extraSmall>5. Masukkan nominal pembayaran.</Text>
                    <Text block extraSmall>6. Input token M-Banking anda.</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</Text>
                    <Text block extraSmall>2. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
            {tabActive === 'i-banking' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall> 1. Login akun Internet Banking pada handphone anda.</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih menu &quot;Transfer Dana&quot;</Text>
                    <Text block extraSmall>2. Pilih menu &quot;Transfer ke Rekening Bank Sampoerna&quot;</Text>
                    <Text block extraSmall>{`3. Masukkan Nomor Virtual Account ${vaNumber}`}</Text>
                    <Text block extraSmall>4. Masukkan nominal pembayaran.</Text>
                    <Text block extraSmall>5. Masukkan otentikasi transaksi/token.</Text>
                    <Text block extraSmall>6. Input token i-Banking anda.</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</Text>
                    <Text block extraSmall>2. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
            {tabActive === 'atm' && (
                <>
                    <Text block bold marginY>LANGKAH 1: MASUK KE AKUN ANDA</Text>
                    <Text block extraSmall>1. Masukkan kartu ATM</Text>
                    <Text block extraSmall>2. Masukkan PIN</Text>
                    <Text block bold marginY>LANGKAH 2: DETAIL PEMBAYARAN</Text>
                    <Text block extraSmall>1. Pilih menu &quot;Transaksi&quot;</Text>
                    <Text block extraSmall>2. Pilih &quot;Lainnya&quot;</Text>
                    <Text block extraSmall>3. Pilih menu &quot;Transfer&quot;</Text>
                    <Text block extraSmall>4. Pilih menu &quot;Tranfer ke Bank Sahabat Sampoerna.&quot;</Text>
                    <Text block extraSmall>{`5. Masukkan 16 digit nomor rekening virtual account${vaNumber}`}</Text>
                    <Text block extraSmall>6. Cek kembali transaksi anda, lalu pilih YA untuk melanjutkan.</Text>
                    <Text block bold marginY>LANGKAH 3: TRANSAKSI BERHASIL</Text>
                    <Text block extraSmall>1. Simpan bukti transaksi anda</Text>
                    <Text block extraSmall>3. Proses verifikasi pembayaran dilakukan secara otomatis. Ini bisa memakan waktu hingga 5 menit</Text>
                </>
            )}
        </>
    );
};

export default SampoernaContent;
