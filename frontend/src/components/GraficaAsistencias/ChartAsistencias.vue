<template >
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Inscritos Por Curso</h3>
            </div>
        </v-card-title>
        <div class="BarGraphWrapper">
            <div class="box box-primary">
                    <div class="box-header with-border">
                    </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-8">
                        <bar-chart></bar-chart>
                        </div>
                        <div class="col-md-4">
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
                </div>
        </div>
    </v-card>
</template>

<script>
import BarChart from './BarChart'
import CourseService from "@/services/CourseService";
import { Bar } from 'vue-chartjs'

export default {
    components:{
        'bar-chart': BarChart
    }
}
</script>

