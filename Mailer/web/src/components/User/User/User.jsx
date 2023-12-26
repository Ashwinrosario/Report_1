import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`
// const EMAIL_USER_MUTATION = gql`
//   mutation EmailUserMutation($id: String!) {
//     emailUser(id: $id) {
//       id
//     }
//   }
// `
const EMAIL_USER_MUTATION = gql`
  mutation EmailUserMutation($id: String!, $emailInput: EmailInput!) {
    emailUser(id: $id, emailInput: $emailInput) {
      id
    }
  }
`;

const User = ({ user }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [emailUser] = useMutation(EMAIL_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Email sent')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  const onEmailClick = async (user) => {
  if (confirm(`Are you sure you want to send an email to ${user.name}?`)) {
    const subject = prompt("Subject about the Mail");
    const text = prompt("Text in the mail");
    const html = `${text}.<br><br>`+`It was sent from a RedwoodJS application.`;
    const data = {
      subject: subject,
      text: text,
      html: html
    };
    try {
      await emailUser({ variables: { id: user.id, emailInput: data } });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
    }
    // emailUser({variables:{id:user.id}})
  }
};


  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(user.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(user.updatedAt)}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUser({ id: user.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(user.id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="rw-button rw-button-green"
          onClick={() => onEmailClick(user)}
        >
          Send Email
        </button>
      </nav>
    </>
  )
}

export default User
