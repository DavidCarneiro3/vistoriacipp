<?

class ConexaoDAO 
{

	public function getConnectMySQL() 
	{
		// $servidor = '216.172.173.11';
		// $banco = 'cipet803_agendamentos';
		
		// $usuario = 'cipet803_agenda';
		// $senha = 'rIVERA3E)msU';

		$servidor = 'agendamentosbd.mysql.dbaas.com.br';
		$banco = 'agendamentosbd';
		
		$usuario = 'agendamentosbd';
		$senha = 'vivas@123';

		$con = new mysqli($servidor,$usuario,$senha,$banco);
		if ($con->connect_errno)
		{
			die("ERROR: Falha na conexão com o banco de dados...");
		}
		
		$con->set_charset('utf8');

		return $con;
	}

}

?>