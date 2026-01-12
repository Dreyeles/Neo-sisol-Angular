import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-doctor-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './doctor-dashboard.html',
    styleUrl: './doctor-dashboard.css'
})
export class DoctorDashboardComponent implements OnInit {
    user: any;
    activeSection = 'agenda';
    citas: any[] = [];
    pacientes: any[] = [];
    loadingCitas = false;
    loadingPacientes = false;
    especialidadNombre = 'Cargando...';

    // Consultation Modal
    showConsultaModal = false;
    consultaActual: any = null;
    consultaStep = 1;
    consultaForm: any = {
        peso: '',
        talla: '',
        presion_arterial: '',
        temperatura: '',
        grupo_sanguineo: '',
        alergias: '',
        enfermedades_cronicas: '',
        cirugias_previas: '',
        medicamentos_actuales: '',
        antecedentes_familiares: '',
        antecedentes_personales: '',
        vacunas: '',
        motivo_consulta: '',
        sintomas: '',
        diagnostico: '',
        observaciones: '',
        tratamiento: '',
        receta_medica: '',
        proxima_cita: ''
    };

    diagnosticosList: string[] = [];
    nuevoDiagnostico = '';
    tratamientosList: string[] = [];
    nuevoTratamiento = '';
    medicamentosList: any[] = [];
    nuevoMedicamento = { nombre: '', dosis: '', frecuencia: '', duracion: '', notas: '' };

    examenesAgregados: any[] = [];
    departamentos: any[] = [];
    serviciosExamen: any[] = [];
    examenDepto = '';
    examenServicio = '';
    solicitarExamen = false;

    constructor(
        private authService: AuthService,
        private doctorService: DoctorService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.user = this.authService.currentUserValue();
        if (!this.user || this.user.role !== 'doctor') {
            this.router.navigate(['/home']);
            return;
        }
        this.loadData();
        this.loadDepartamentos();
    }

    loadData() {
        if (this.activeSection === 'agenda') this.loadCitas();
        if (this.activeSection === 'pacientes') this.loadPacientes();
        if (this.activeSection === 'perfil') this.loadEspecialidadInfo();
    }

    setActiveSection(section: string) {
        this.activeSection = section;
        this.loadData();
    }

    loadCitas() {
        this.loadingCitas = true;
        this.doctorService.getAppointmentsByDoctor(this.user.id_medico).subscribe({
            next: (res) => {
                if (res.status === 'OK') this.citas = res.data;
                this.loadingCitas = false;
            },
            error: () => this.loadingCitas = false
        });
    }

    loadPacientes() {
        this.loadingPacientes = true;
        this.doctorService.getPatientsByDoctor(this.user.id_medico).subscribe({
            next: (res) => {
                if (res.status === 'OK') this.pacientes = res.data;
                this.loadingPacientes = false;
            },
            error: () => this.loadingPacientes = false
        });
    }

    loadEspecialidadInfo() {
        this.doctorService.getEspecialidades().subscribe({
            next: (res) => {
                if (res.status === 'OK') {
                    const esp = res.data.find((e: any) => e.id_especialidad === this.user.id_especialidad);
                    if (esp) this.especialidadNombre = esp.nombre;
                }
            }
        });
    }

    loadDepartamentos() {
        this.doctorService.getDepartamentos().subscribe({
            next: (res) => {
                if (res.status === 'OK') this.departamentos = res.data;
            }
        });
    }

    onDeptoChange() {
        this.examenServicio = '';
        if (this.examenDepto) {
            this.doctorService.getServiciosByDepartamento(Number(this.examenDepto)).subscribe({
                next: (res) => {
                    if (res.status === 'OK') this.serviciosExamen = res.data;
                }
            });
        } else {
            this.serviciosExamen = [];
        }
    }

    handleIniciarConsulta(cita: any) {
        this.consultaActual = cita;
        this.showConsultaModal = true;
        this.consultaStep = 1;
        this.resetConsultaForm();

        // Prefill some data if available
        this.doctorService.getPatientMedicalProfile(cita.id_paciente).subscribe({
            next: (res) => {
                if (res.status === 'OK') {
                    const profile = res.data;
                    this.consultaForm.grupo_sanguineo = profile.grupo_sanguineo || '';
                    this.consultaForm.alergias = profile.alergias || '';
                    if (profile.historial_medico) {
                        const h = profile.historial_medico;
                        this.consultaForm.enfermedades_cronicas = h.enfermedades_cronicas || '';
                        this.consultaForm.cirugias_previas = h.cirugias_previas || '';
                        this.consultaForm.medicamentos_actuales = h.medicamentos_actuales || '';
                    }
                }
            }
        });
    }

    resetConsultaForm() {
        this.diagnosticosList = [];
        this.tratamientosList = [];
        this.medicamentosList = [];
        this.examenesAgregados = [];
        this.consultaForm.motivo_consulta = this.consultaActual?.motivo_consulta || '';
    }

    handleAgregarDiagnostico() {
        if (this.nuevoDiagnostico.trim()) {
            this.diagnosticosList.push(this.nuevoDiagnostico.trim());
            this.nuevoDiagnostico = '';
        }
    }

    handleAgregarTratamiento() {
        if (this.nuevoTratamiento.trim()) {
            this.tratamientosList.push(this.nuevoTratamiento.trim());
            this.nuevoTratamiento = '';
        }
    }

    handleAgregarMedicamento() {
        if (this.nuevoMedicamento.nombre && this.nuevoMedicamento.dosis) {
            this.medicamentosList.push({ ...this.nuevoMedicamento });
            this.nuevoMedicamento = { nombre: '', dosis: '', frecuencia: '', duracion: '', notas: '' };
        }
    }

    handleAgregarExamen() {
        if (this.examenServicio) {
            const servicio = this.serviciosExamen.find(s => s.id_servicio == this.examenServicio);
            if (servicio) {
                this.examenesAgregados.push({
                    id_servicio: servicio.id_servicio,
                    servicio: servicio.nombre,
                    costo: servicio.costo
                });
                this.examenServicio = '';
            }
        }
    }

    handleSubmitConsulta() {
        const payload = {
            id_cita: this.consultaActual.id_cita,
            id_paciente: this.consultaActual.id_paciente,
            id_medico: this.user.id_medico,
            ...this.consultaForm,
            diagnostico: JSON.stringify(this.diagnosticosList),
            tratamiento: JSON.stringify(this.tratamientosList),
            receta_medica: JSON.stringify(this.medicamentosList),
            examenes_solicitados: JSON.stringify(this.examenesAgregados)
        };

        this.doctorService.registerAttention(payload).subscribe({
            next: (res) => {
                if (res.status === 'OK') {
                    alert('Consulta registrada con éxito');
                    this.showConsultaModal = false;
                    this.loadCitas();
                } else {
                    alert('Error: ' + res.message);
                }
            },
            error: () => alert('Error al registrar consulta')
        });
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}
