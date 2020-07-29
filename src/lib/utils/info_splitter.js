// Realizando Split (Situações Específicas)

module.exports = {
    infoCommaSplitter(info) {
       return info.split(",")
    },

    infoDashSplitter(info) {
        return info.split("-")
     },

     infoQuotationMarksSplitter(info) {
      return info.split('"')
   },

     infoTimeSplitter(info) {
      return info.split("T")
   },

   infoSlashSplitter(info) {
      return info.split("/")
   }
}