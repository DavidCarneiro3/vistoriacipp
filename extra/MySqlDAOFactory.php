<?

include_once "mysql/MySqlSysUsuarioDAO.php";
include_once "mysql/MySqlSysPermissaoDAO.php";
include_once "mysql/MySqlAgendamentoDAO.php";
include_once "mysql/MySqlServicoDAO.php";
include_once "mysql/MySqlUnidadeAtendimentoDAO.php";
include_once "mysql/MySqlServicoUnidadeDAO.php";
include_once "mysql/MySqlSolicitacaoDAO.php";
include_once "mysql/MySqlHorarioAtendimentoDAO.php";
include_once "mysql/MySqlTransacaoPagamentoDAO.php";
include_once "mysql/MySqlSysChaveAppDAO.php";
include_once "mysql/MySqlSysConfiguracaoDAO.php";
include_once "mysql/MySqlSysEstadoDAO.php";
include_once "mysql/MySqlSysCidadeDAO.php";

class MySqlDAOFactory 
{
	public function getSysUsuarioDAO()
	{
		return new MySqlSysUsuarioDAO();
	}
	
	public function getSysPermissaoDAO()
	{
		return new MySqlSysPermissaoDAO();
	}
	
	public function getAgendamentoDAO()
	{
		return new MySqlAgendamentoDAO();
	}
	
	public function getServicoDAO()
	{
		return new MySqlServicoDAO();
	}
	
	public function getUnidadeAtendimentoDAO()
	{
		return new MySqlUnidadeAtendimentoDAO();
	}
	
	public function getServicoUnidadeDAO()
	{
		return new MySqlServicoUnidadeDAO();
	}
	
	public function getSolicitacaoDAO()
	{
		return new MySqlSolicitacaoDAO();
	}
	
	public function getSolicitacaoEtfDAO()
	{
		return new MySqlSolicitacaoEtfDAO();
	}

	public function getHorarioAtendimentoDAO()
	{
		return new MySqlHorarioAtendimentoDAO();
	}
	
	public function getTransacaoPagamentoDAO()
	{
		return new MySqlTransacaoPagamentoDAO();
	}
	
	public function getSysChaveAppDAO()
	{
		return new MySqlSysChaveAppDAO();
	}
	
	public function getSysConfiguracaoDAO()
	{
		return new MySqlSysConfiguracaoDAO();
	}
	
	public function getSysEstadoDAO()
	{
		return new MySqlSysEstadoDAO();
	}
	
	public function getSysCidadeDAO()
	{
		return new MySqlSysCidadeDAO();
	}
}

?>