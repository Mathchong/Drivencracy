import { Router } from 'express'

import pollRouter from './polls/index.js'
import choiceRouter from './choice/index.js'

const router = Router()

router.use('/poll', pollRouter)
router.use('/choice', choiceRouter)


export default router
//POST /poll {Criar nova enquete}
//GET /poll {Mostrar todas enquetes}
//POST /choice {Criar opção de voto em enquete}
//GET /poll/:id/choice {Retorna opções de voto em enquete}
//POST /choice/:id/vote {Vota em uma opção de uma enquete}
//GET /poll/:id/result {Retorna a opção mais votada de uma enquete}