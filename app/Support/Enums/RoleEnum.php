<?php

namespace App\Support\Enums;

enum RoleEnum: string {
    case SUPER_ADMIN = 'Super Admin';
    case PPC_PERENCANAAN = 'PPC - Perencanaan';
    case PPC_PENGENDALIAN = 'PPC - Pengendalian';
    case SUPERVISOR_MEKANIK = 'Supervisor - Mekanik';
    case SUPERVISOR_ELEKTRIK = 'Supervisor - Elektrik';
    case SUPERVISOR_ASSEMBLY = 'Supervisor - Assembly';
    case WORKER_MEKANIK = 'Worker - Mekanik';
    case WORKER_ELEKTRIK = 'Worker - Elektrik';
    case WORKER_ASSEMBLY = 'Worker - Assembly';
    case QC_MEKANIK = 'QC - Mekanik';
    case QC_ELEKTRIK = 'QC - Elektrik';
    case QC_ASSEMBLY = 'QC - Assembly';
    case MANAGER_AFTERSALES = 'Manager - Aftersales';
    case SUPERVISOR_AFTERSALES = 'Supervisor - Aftersales';
    case WORKER_AFTERSALES = 'Worker - Aftersales';
}
