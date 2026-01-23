---
title: Machine Learning for Quantum Many-body
date: 2026-01-23
tags:
  - ML
  - Tutorial
---
针对你关注的领域（量子多体物理 + 机器学习）以及你感兴趣的导师研究风格，以下是为你精选的综述、教学文献及最新书籍推荐。

---

### 1. 领域“圣经”级综述（必读）

如果你想系统了解机器学习如何进入物理学，这两篇综述是避不开的基石。

- **《Machine learning and the physical sciences》**
    
    - **作者：** Giuseppe Carleo, et al. (2019)
        
    - **刊物：** _Reviews of Modern Physics_ (RMP)
        
    - **特点：** 这是该领域引用率最高的综述。涵盖了从神经网络量子态（NQS）到相变识别的几乎所有基础方向。虽然是几年前的，但其中的物理图像和基本方法论依然是目前的标准。
        
- **《Machine learning for quantum matter》**
    
    - **作者：** Juan Carrasquilla (2020)
        
    - **刊物：** _Advances in Physics: X_
        
    - **特点：** 相比 RMP，这篇更侧重于**量子凝聚态**。非常适合你想解决的“区分量子相”问题。
        

---

### 2. 教学与入门类文章（侧重原理推导）

这类文章不只是列举成果，更多是教你如何从物理学家的角度理解 ML 算法。

- **《A high-bias, low-variance introduction to Machine Learning for physicists》**
    
    - **作者：** Pankaj Mehta, et al. (2019)
        
    - **刊物：** _Physics Reports_
        
    - **核心：** 极力推荐！它用物理学家熟悉的语言（如 Ising 模型、平均场、重整化群）来解释回归、神经网络和深度学习。如果你想从数学上搞清楚“为什么 ML 能处理量子多体数据”，这是最好的教材。
        
- **《The randomized measurement toolbox》**
    
    - **作者：** Andreas Elben, **Hsin-Yuan Huang**, **John Preskill**, et al. (2023)
        
    - **刊物：** _Nature Reviews Physics_
        
    - **针对问题：** **随机测量（Randomized Measurements）**。这篇综述详细讲解了如何通过随机测量提取纠缠熵、保真度等，直接对应你提到的研究问题。
        

---

### 3. 针对你关注导师的特定方向

你提到的这几位老师，其工作重点往往在于**信息论边界**与**有效性证明**。

- **关于 Hsin-Yuan Huang & Soonwon Choi (Classical Shadows 方向):**
    
    - 建议研读 Hsin-Yuan Huang 的博士论文或他在校内（如 Caltech/CERN）的 **Tutorial 讲义**（如 _Learning Theory for Quantum Machines_）。
        
    - 重点看他 2022 年在 _Nature Computational Science_ 上的综述 **《Challenges and opportunities in quantum machine learning》**，里面深入讨论了经典 ML 处理量子数据的优势边界。
        
- **关于 尤亦庄 (Yi-Zhuang You) & 胡鸿业 (Hong-Ye Hu) (张量网络 + RG 方向):**
    
    - **《Machine Learning Renormalization Group》** 相关的一系列论文。他们更倾向于将 ML 与物理中的**重整化群 (RG)** 思想结合。建议关注他们最近关于 "Generative models for quantum systems" 的系列文章。
        

---

### 4. 最新书籍推荐 (2025-2026)

目前该领域已从单纯的论文集结转向成熟的教科书体系：

|书名|作者/年份|适用场景|
|---|---|---|
|**《Machine Learning in Quantum Sciences》**|Anna Dawid, Maciej Lewenstein, et al. (2025)|**最新首选**。由剑桥大学出版社出版，涵盖了多体系统、拓扑序识别、神经网络变分法等最前沿课题。|
|**《Quantum Machine Learning: Platform, Tools and Applications》**|Shiho Kim, et al. (2026)|侧重于算法实现与工具链的使用。|
|**《TensorFlow for Quantum Physics》**|社区教程/教材|如果你想写代码实现 NQS，这本书对底层架构的讲解很有帮助。|

导出到 Google 表格

---

### 5. 实践类资源（工具库文档）

如果你想直接动手解决“量子层析”或“区分量子相”，不要从零写起，建议阅读以下库的文档和示例代码：

1. **NetKet (Python/JAX):** 由 Giuseppe Carleo 团队开发，是目前用机器学习做多体物理计算（NQS, VMC）的行业标准。其文档本身就是一部极好的“教学书”。
    
2. **QuCumber:** 专门用于处理量子状态重构（层析）的工具，适合处理你提到的测量数据。
    

---

**下一步建议：** 如果你想深入了解 **Classical Shadows (黄信元方向)** 的具体算法实现，我可以为你整理一份关于 **“如何从随机 Pauli 测量中利用影子层析重构可观测量的核心流程”** 的笔记。你想看这个吗？
https://arxiv.org/pdf/2106.12627
https://caltech-quantum-learning-theory.github.io/#topics