const useLocation = (value) => {
  if (value === 'UPT') {
    return "Perpustakaan UR"
  }

  if (value === "01") {
    return "Perpustakaan FISIP"
  }

  if (value === "02") {
    return "Perpustakaan FEKON"
  }
  if (value === "03") {
    return "Perpustakaan FMIPA"
  }

  if (value === "04") {
    return "Perpustakaan FAPERIKA"
  }

  if (value === "05") {
    return "Perpustakaan FKIP"
  }

  if (value === "06") {
    return "Perpustakaan FAPERTA"
  }

  if (value === "07") {
    return "Perpustakaan FTEKNIK"
  }

  if (value === "08") {
    return "Perpustakaan FK"
  }

  if (value === "09") {
    return "Perpustakaan FHUKUM"
  }

  if (value === "10") {
    return "Perpustakaan PASCA"
  }

  if (value === "11") {
    return "Perpustakaan PSIK"
  }

  if (value === "12") {
    return "Perpustakaan STIFAR"
  }
}

export default useLocation
