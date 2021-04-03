import React, {useState, useEffect} from 'react'

//Variables de entorno
const API = process.env.REACT_APP_API;

export const Users = () => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	//Pintar datos en pantalla
	const [users, setUsers] = useState([])

	//Guardar datos en la apirest
	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(name,email,password)
		//Enviar datos a la restapi
		const res = await fetch(`${API}/users`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				email,
				password
			})
		})
		const data = await res.json();
		console.log(data)
	}

	//Listar usuarios de la apirest
	const getUsers = async () => {
		const res = await fetch(`${API}/users`)
		const data = await res.json();
		//console.log(data)
		setUsers(data)
	}

	useEffect(() => {
		getUsers();
	}, [])

	//Funcion para eliminar usuario
	const deleteUser = (id) => {
		console.log(id)
	}

	return(
		<div className="row">
			<div className="col-md-4">
				<form onSubmit={handleSubmit} className="card card-body">
					<div className="form-group">
						<input type="text"
						onChange={e => setName(e.target.value)}
						value={name}
						className="form-control"
						placeholder="Name"
						autoFocus
						/>
					</div>

					<div className="form-group">
						<input type="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
						className="form-control"
						placeholder="email"
						/>
					</div>

					<div className="form-group">
						<input type="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
						className="form-control"
						placeholder="password"
						/>
					</div>

					<button className="btn btn-primary btn-block">
						Create
					</button>
				</form>
			</div>

			<div className="col-md-8">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Password</th>
							<th>Operations</th>
						</tr>
					</thead>

					<tbody>
						{users.map(user => (
                           <tr key={user._id}>
                           		<td>${user.name}</td>
                           		<td>${user.email}</td>
                           		<td>${user.password}</td>
                           		<td>
                           			<button className="btn btn-secondary btn-sm btn-block">
                           				Edit
                           			</button>

                           			<button
                           				className="btn btn-danger btn-sm btn-block"
                           				onClick={(e) => deleteUser(user._id)}
                           				>
                           				Delete
                           			</button>
                           		</td>
                           </tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}