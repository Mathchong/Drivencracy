import {Router} from 'express'

import poolRouter from './pools/index.js'

const router = Router()

router.use('/pool', poolRouter)


export default router
//POST /poll {Criar nova enquete}
//GET /poll {Mostrar todas enquetes}
//GET /poll/:id/result {Retorna a opção mais votada de uma enquete}
//GET /poll/:id/choice {Retorna opções de voto em enquete}

//POST /choice {Criar opção de voto em enquete}
//POST /choice/:id/vote {Vota em uma opção de uma enquete}

