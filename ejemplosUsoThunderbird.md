Ver total de habitaciones 
GET
http://localhost:3001/habitaciones

Añadir habitacion
POST
http://localhost:3001/habitaciones/adi

editar habitacion
PUT
http://localhost:3001/habitaciones/(numero "id" habitacion)
{
    "numero": "101",
    "tipo": "simple",
    "precio_base": "100.00",
    "estado": "activa"
}


uso diario habitacion rango: (fecha ini- fecha final)
GET 
http://localhost:3001/reportes/uso-diario?inicio=2025-12-01&fin=2025-12-10

devuelve ingresos por día en rango (fecha ini - gecha final)
GET 
http://localhost:3001/reportes/ingresos-dia?inicio=2025-12-01&fin=2025-12-31

para ingresos por mes
GET 
http://localhost:3001/reportes/ingresos-mes
