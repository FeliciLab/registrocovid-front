/**
 * No Exame RT-PCR não teremos nenhum campo obrigatório, a data da coleta e resultado são os
 * identificadores deste exame.
 * Se não tiver nenhuma informação preenchida, o exame não deve ser enviado para o backend.
 * Esse erro deve ser disparando quando o usuário tentar cadastar um Exame RT-PCR sem nenhum campo
 * preenchido.
 */
class EmptyRTPCRError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmptyRTPCRError';
  }
}

export default EmptyRTPCRError;
