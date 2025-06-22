const EMAIL_TO = "gleidsonfabiano2santos@gmail.com";
const SHEET_NAME = "Formulário";

function doPost(e) {
  const params = e.parameter;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  // Cabeçalhos (se ainda não tiver)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "CPF", "Nome Completo", "Nome Social", "E-mail",
      "Telefone", "Tipo Vaga", "PCD", "Home Office", "Idiomas",
      "Parentesco"
    ]);
  }

  // Coluna de idiomas (concatenada)
  const idiomas = params.idiomas ? JSON.parse(params.idiomas).join(", ") : "";

  sheet.appendRow([
    new Date(),
    params.cpf,
    params.nome_completo,
    params.nome_social,
    params.email,
    params.telefone,
    params.tipo_vaga,
    params.pcd,
    params.home_office,
    idiomas,
    params.parentesco
  ]);

  // Enviar e-mail com os dados
  const subject = "Nova indicação enviada";
  const body = `
    CPF: ${params.cpf}
    Nome: ${params.nome_completo}
    Nome Social: ${params.nome_social}
    E-mail: ${params.email}
    Telefone: ${params.telefone}
    Tipo de Vaga: ${params.tipo_vaga}
    PCD? ${params.pcd}
    Home Office? ${params.home_office}
    Idiomas: ${idiomas}
    Parentesco? ${params.parentesco}
  `;
  MailApp.sendEmail(EMAIL_TO, subject, body);

  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}
