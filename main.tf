variable "DOCKER_USERNAME" {
  type    = string
  default = "1"
}
variable "DOCKER_PASSWORD" {
  type    = string
  default = "1"
}
variable "IMAGE_NAME" {
  type    = string
  default = "1"
}
variable "REPO" {
  type    = string
  default = "1"
}
variable "VERSION" {
  type    = string
  default = "1"
}
variable "JOB_ENV" {
  type    = string
  default = "1"
}

resource "local_file" "nomad" {
  content = templatefile(
    "${path.module}/pm_nomad_${var.JOB_ENV}.tpl",
    {
      DOCKER_USERNAME = var.DOCKER_USERNAME
      DOCKER_PASSWORD = var.DOCKER_PASSWORD
      IMAGE_NAME      = var.IMAGE_NAME
      VERSION         = var.VERSION
      REPO            = var.REPO
      JOB_ENV         = var.JOB_ENV
    }
  )
  filename = "./pm_nomad_${var.JOB_ENV}.nomad"
}