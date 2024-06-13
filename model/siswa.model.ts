export class siswaDTO {
    gid?: string
    username?: string
    fullname?: string
    email?: string
    nohp?: number
    pic?: string
}

export class biodataDTO {
    id?: number
    gid?: string
    alamat?: string
    ttl?: string
    jenis_kelamin?: string
    agama?: string
    asal_sekolah?: string
    nilai_rata_rata?: number
    rekomendasi_jurusan?: any
}

export class siswaAdminDTO {
    gid?: string
    createdAt?: string
    updatedAt?: string
    User?: {
        username?: string
        email?: string
        nohp?: number
        fullname?: string
        pic?: string
        createdAt?: string
        updatedAt?: string
    }
    siswa?: {
        id?: string
        gid?: string
        alamat?: string
        ttl?: string
        jenis_kelamin?: string
        agama?: string
        asal_sekolah?: string
        nilai_rata_rata?: number
        createdAt?: string
        updatedAt?: string
        rekomendasi_jurusan?: any
    }
}