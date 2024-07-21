job "pm-app-${JOB_ENV}" {
  datacenters = ["dc1"]
  type        = "service"
   update {
    stagger      = "30s"
    max_parallel = 1
  }

  group "pm-appgr-${JOB_ENV}" {
    network {
      port "pm_app" {
	      static = 8080
	    }
    }

    restart {
      attempts = 10
      interval = "5m"
      delay    = "25s"
      mode     = "delay"
    }
    update {
        max_parallel = 2
        min_healthy_time = "5s"
        healthy_deadline = "3m"
        auto_revert = true
        canary = 0
    }

    task "pm_app" {
      driver = "docker"
      logs {
        max_files     = 2
        max_file_size = 3
      }
      config {
        image = "${REPO}/${DOCKER_USERNAME}/pm_app_${JOB_ENV}:${VERSION}"
        ports = ["pm_app"]
        auth {
          username = "${DOCKER_USERNAME}"
          password = "${DOCKER_PASSWORD}"
        }
      }
      resources {
        cpu    = 350
        memory = 350
        }
      }
  }
}
