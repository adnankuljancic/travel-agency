<?php
require_once 'BaseService.php';
require_once __DIR__ . "/../dao/TripDao.class.php";
require_once __DIR__ . '/../config.php';

class TripService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new TripDao);
    }

}
?>