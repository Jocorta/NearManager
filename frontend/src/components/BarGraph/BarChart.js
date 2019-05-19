import { Bar } from 'vue-chartjs'
import CourseService from "@/services/CourseService";

export default {
    extends: Bar,
    data () {
        return {
        cursos:[],
        data: [], // n de alumnos
        labels: [] // cursos
        }
    },
    methods: {
        async cargarCursos() {
            let response = await CourseService.getCourses();
            console.log(response.data);
            this.cursos = response.data;
            this.dataFill();
            this.setUpGraph();
        },
        dataFill(){
            this.cursos.forEach(element => {
                this.labels.push(element.nombre)
                this.data.push(element.personas.length)
            });
        },
        setUpGraph() {
        this.renderChart({
        labels: this.labels,
        datasets: [
            {label: 'Inscritos', backgroundColor: '#86d1f9', data: this.data}
        ]
        }, 
        { responsive: true, 
            maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
        })
    }
    },
    beforeMount() {
        this.cargarCursos();         
    }
}