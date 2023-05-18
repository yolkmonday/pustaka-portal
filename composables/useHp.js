const useHp = (value) => {
  if (value) {
    const length = value.length
    return value.slice(0, length - 9) + '****' + value.slice(length - 3, length)
  } else {
    return value
  }

}

export default useHp
