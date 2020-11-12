import api from 'services/api'

export const submitFormComorbidade = (values) => {
  console.log(values)

  const handleSubmit = async values => {
    const submitData = {
      diabetes: '',
      obesidade: '',
      hipertensao: '',
      neoplasia: '',
      quimioterapia: '',
      HIV: 'hiv',
      tuberculose: '',
      outras_condicoes: 'outrasCondicoes',
      medicacoes: '',
    };

    if (values.gestacao_semanas) {
      submitData.gestacao_semanas = values.gestacao_semanas;
    }
    if (values.puerperio_semanas) {
      submitData.puerperio_semanas = values.puerperio_semanas;
    }

    Object.entries(values).forEach(entrie => {
      if (Array.isArray(entrie[1])) {
        let array_values = [];
        entrie[1].forEach((v, index) =>
          v ? array_values.push(index + 1) : '',
        );
        submitData[`${entrie[0]}`] = array_values;
      } else if (typeof entrie[1] === 'string') {
        if (entrie[1]) submitData[`${entrie[0]}`] = entrie[1] === 'sim';
      }
    });

//  MAPEIA O TIPO DE DOENCA NO CAMPO BOLEANO DA COMORBIDADE
    ['selectedIds'].forEach(id => {
      switch (id) {
        case 1:
          submitData.doenca_cardiaca = true;
          break;
        case 2:
          submitData.doenca_vascular_periferica = true;
          break;
        case 3:
          submitData.doenca_pulmonar_cronica = true;
          break;
        case 4:
          submitData.doenca_reumatologica = true;
          break;
        case 5:
          submitData.cancer = true;
          break;
        case 6:
          submitData.doenca_renal_cronica = true;
          break;
        case 7:
          submitData.doenca_hepatica_cronica = true;
          break;
        case 8:
          submitData.doenca_neurologica = true;
          break;
        case 9:
          submitData.doenca_tireoide = true;
          break;
        case 10:
          submitData.doenca_psiquiatrica = true;
          break;
        default:
          break;
      }
    });

    // setIsSaving(true);
    try {
      await api.post(`/pacientes/patient.id/comorbidades`, submitData);

      // addToast({
      //   type: 'success',
      //   message: 'Dados salvos com sucesso',
      // });
      // setIsSaving(false);
      // history.push('/categorias');
    } catch (err) {
      // addToast({
      //   type: 'error',
      //   message:
      //     'Ocorreu um erro ao salvar os dados, por favor tente novamente',
      // });
      // setIsSaving(false);
    }
  };

}

export default {
  submitFormComorbidade
}
