-- CreateTable
CREATE TABLE "SensorData" (
    "id" SERIAL NOT NULL,
    "temperatura" DOUBLE PRECISION NOT NULL,
    "presion" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);
