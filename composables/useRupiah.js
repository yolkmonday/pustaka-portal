const useRupiah = (value) => {
  const val = (value / 1).toFixed(0).replace('.', ',')
  return "Rp" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default useRupiah
