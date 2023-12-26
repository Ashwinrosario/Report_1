import { db } from 'src/lib/db'

import { sendEmail, EmailData } from 'src/lib/email';

function sendTestEmail(emailAddress, emailInput) {
  // const subject = 'Test Email';
  // const text =
  //   'This is a manually triggered test email.\n\n' +
  //   'It was sent from a RedwoodJS application.';
  // const html =
  //   'This is a manually triggered test email.<br><br>' +
  //   'It was sent from a RedwoodJS application.';
  const {subject, text, html} = emailInput
  return sendEmail({ to: emailAddress, subject, text, html });
}


export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const emailUser = async ({ id , emailInput}) => {
  const user = await db.user.findUnique({
    where: { id },
  });
  await sendTestEmail(user.email, emailInput)
  return user
}
