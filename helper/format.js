const formatRupiah = (income) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(income);
}

module.exports = formatRupiah