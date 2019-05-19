<template >
    <v-card>
        <div class="BarGraphWrapper">
            <div class="box box-primary">
                    <div class="box-header with-border">
                        <h1>Inscritos por curso</h1>
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

