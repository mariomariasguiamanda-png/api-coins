import Cadastro from "../models/CadastroModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import sendMail from "../utils/sendMail.js";

export const cadastroController = {
  // Criar cadastro
  create: asyncHandler(async (req, res) => {
    const { nome, email, senha, perfil, instituicao, telefone } = req.body;

    if (!nome || !email || !senha || !perfil) {
      return res.status(400).json({ message: "Campos obrigatórios faltando" });
    }

    const existing = await Cadastro.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(senha, 10);

    const novoCadastro = await Cadastro.create({
      nome,
      email,
      senha: hash,
      perfil,
      instituicao,
      telefone,
    });

    // 🔹 Montar corpo do e-mail com logo inline
    const body = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9f9f9; padding: 20px; line-height: 1.6;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          
          <!-- Header com logo e gradiente -->
          <div style="background: linear-gradient(135deg, #7C3AED 0%, #C084FC 50%, #FACC15 100%); padding: 40px 20px; text-align: center; position: relative;">
            <div style="margin-bottom: 15px;">
              <img src="cid:logoCoins" alt="Coins for Study" style="width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.2); padding: 10px; backdrop-filter: blur(10px);" />
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              Bem-vindo ao Coins for Study! 🎉
            </h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300;">
              Transformando aprendizado em conquistas
            </p>
          </div>

          <!-- Conteúdo principal -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #333; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">
                Olá, ${nome}! 👋
              </h2>
              <p style="color: #666; font-size: 16px; margin: 0;">
                Sua jornada de aprendizado começa agora
              </p>
            </div>

            <div style="background: linear-gradient(45deg, #f8fafc, #f1f5f9); border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #FACC15;">
              <p style="color: #555; margin: 0 0 15px 0; font-size: 16px;">
                🪙 <strong>Estamos felizes em ter você com a gente!</strong>
              </p>
              <p style="color: #555; margin: 0; font-size: 15px;">
                Agora você pode explorar nossas atividades, acumular moedas e trocar por recompensas incríveis.
              </p>
            </div>

            <!-- Próximos passos -->
            <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #e0f2fe;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                🚀 Seus próximos passos:
              </h3>
              <ul style="color: #0369a1; margin: 0; padding-left: 20px; font-size: 14px;">
                <li style="margin-bottom: 8px;">Complete seu perfil para ganhar suas primeiras moedas</li>
                <li style="margin-bottom: 8px;">Explore as atividades disponíveis</li>
                <li>Comece a acumular moedas estudando!</li>
              </ul>
            </div>

            <!-- Botão CTA -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="http://localhost:3000/login" 
                 style="display: inline-block; background: linear-gradient(45deg, #FACC15, #f59e0b); color: #000; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4); transition: all 0.3s ease;">
                ✨ Acessar minha conta
              </a>
            </div>

            <!-- Dica -->
            <div style="text-align: center; padding: 20px; background: rgba(124, 58, 237, 0.05); border-radius: 8px; margin-top: 25px;">
              <p style="color: #7C3AED; font-size: 14px; margin: 0; font-weight: 500;">
                💡 <strong>Dica:</strong> Complete seu perfil para ganhar suas primeiras 50 moedas! 🪙
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
            <div style="margin-bottom: 10px;">
              <img src="cid:logoCoins" alt="Coins for Study" style="width: 40px; height: 40px; opacity: 0.6;" />
            </div>
            <p style="margin: 0 0 5px 0; font-size: 13px; color: #64748b; font-weight: 500;">
              Coins for Study © ${new Date().getFullYear()}
            </p>
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
              Transformando aprendizado em conquistas! 🎓
            </p>
          </div>
        </div>

        <!-- Rodapé adicional (fora do card) -->
        <div style="text-align: center; margin-top: 20px; padding: 0 20px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Se você não se cadastrou em nossa plataforma, pode ignorar este e-mail.
          </p>
        </div>
      </div>
    `;

    // 🔹 Preparar attachment da logo
    const logoPath = "../coins/public/logo-coins.png"; // Caminho relativo da API para o frontend

    try {
      await sendMail(
        novoCadastro.email,
        novoCadastro.nome,
        body,
        "🎉 Bem-vindo ao Coins for Study!",
        [
          {
            filename: "logo-coins.png",
            path: logoPath,
            cid: "logoCoins", // ID usado no src="cid:logoCoins"
          },
        ]
      );
      console.log(
        `✅ Email de boas-vindas enviado para: ${novoCadastro.email}`
      );
    } catch (err) {
      console.error("❌ Erro ao enviar e-mail de boas-vindas:", err);
    }

    res.status(201).json({
      id: novoCadastro.idCadastro,
      nome: novoCadastro.nome,
      email: novoCadastro.email,
      perfil: novoCadastro.perfil,
      instituicao: novoCadastro.instituicao,
      telefone: novoCadastro.telefone,
    });
  }),

  // Listar cadastros
  list: asyncHandler(async (req, res) => {
    const cadastros = await Cadastro.findAll({
      attributes: [
        "idCadastro",
        "nome",
        "email",
        "perfil",
        "instituicao",
        "telefone",
        "criadoEm",
      ],
    });
    res.json(cadastros);
  }),

  // Buscar cadastro por ID
  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cadastro = await Cadastro.findByPk(id, {
      attributes: [
        "idCadastro",
        "nome",
        "email",
        "perfil",
        "instituicao",
        "telefone",
        "criadoEm",
      ],
    });

    if (!cadastro)
      return res.status(404).json({ message: "Cadastro não encontrado" });

    res.json(cadastro);
  }),

  // Deletar cadastro
  remove: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cadastro = await Cadastro.findByPk(id);

    if (!cadastro)
      return res.status(404).json({ message: "Cadastro não encontrado" });

    await cadastro.destroy();
    res.json({ message: "Cadastro removido com sucesso" });
  }),
};
