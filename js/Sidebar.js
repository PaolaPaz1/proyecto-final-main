export const Sidebar = () => {
  const Sidebar = document.createElement('nav')
  Sidebar.className = 'sidebar close'

  Sidebar.innerHTML = `
  <header>
  <div class="image-text">
    <span class="image">
      <img src="../images/cerdo.png" alt="" />
    </span>
  </div>
  <i class="bx bx-chevron-right toggle"></i>
  </header>

  <div class="menu-bar">
    <div class="menu">
      <ul class="menu-links">
        <li class="nav-link"><a href="cuenta.html"><i class="bx bx-home-alt icon"></i><span class="text nav-text">Mi Cuenta</span></a></li>
        <li class="nav-link"><a href="ingresos.html"><i class="bx bx-bar-chart-alt-2 icon"></i><span class="text nav-text">Ingresos</span></a></li>
        <li class="nav-link"><a href="gastos.html"><i class="bx bx-wallet icon"></i><span class="text nav-text">Egresos</span></a></li>
        <li class="nav-link"><a href="analisis.html"><i class="bx bx-pie-chart-alt icon"></i><span class="text nav-text">Análisis</span></a></li>
        <li class="nav-link"><a href="recomendaciones.html"><i class="bx bx-heart icon"></i><span class="text nav-text">Limite Mensual</span></a></li>
      </ul>
    </div>

    <div class="bottom-content">
      <li class=""><a href="#" id="cerrarSesion"><i class="bx bx-log-out icon"></i><span class="text nav-text">Cerrar Sesión</span></a></li>
      <li class="mode">
        <div class="sun-moon">
          <i class="bx bx-moon icon moon"></i>
          <i class="bx bx-sun icon sun"></i>
        </div>
          <span class="mode-text text">Modo oscuro</span>
          <div class="toggle-switch"><span class="switch"></span></div>
      </li>
    </div>
  </div>
  `

  Sidebar.querySelector('#cerrarSesion').addEventListener('click', () => {
    localStorage.removeItem('userId')
    window.location.href = '../index.html'
  })

  return Sidebar
}

export const initSidebarEvents = (sidebarElement) => {
  const toggle = sidebarElement.querySelector('.toggle')
  const modeSwitch = sidebarElement.querySelector('.toggle-switch')
  const modeText = sidebarElement.querySelector('.mode-text')

  toggle.addEventListener('click', () => {
    sidebarElement.classList.toggle('close')
  })

  modeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark')

    if (document.body.classList.contains('dark')) {
      modeText.innerText = 'Light mode'
    } else {
      modeText.innerText = 'Dark mode'
    }
  })
}
