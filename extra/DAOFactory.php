<?

include_once "MySqlDAOFactory.php";

abstract class DAOFactory 
{

	public static function getDAOFactory($db) 
	{

		switch ($db) 
		{

			case "MYSQL" :
				return new MySqlDAOFactory();

			default :
				return null;
		}
	}

}

?>